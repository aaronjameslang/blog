---
layout: page
title: GitHub Actions OIDC with AWS
tags: software aws devops security
---

# GitHub Deploys to AWS, OIDC for simplicity and security

Many of us start out pasting secret keys in to GitHub secrets
in order to automate deploys, but there's a better way.
OpenID Connect (OIDC) allows GitHub to create it's own tokens within actions and workflow, and AWS can be configured to allow those tokens specific permissions.

This means less work for you, and no secret keys to be copied, rotated, and potentially leaked.

## One OIDC Indentiry Provider to rule them all

AWS only allows a single OIDC Identity Provider per issuer (i.e. GitHub), per account.

So assuming you only have one AWS account, you can set it up once and use it across all your projects.

You probably don't want to include the OIDC provider resource in the Terraform
or IaC for any individual project. Instead create it once and just reference it
in each project you want to set up.

### Check if one already exists

Before creating anything, check whether a provider for GitHub already exists in your account:

```sh
aws iam list-open-id-connect-providers
```

If one exists, you'll get back a list of ARNs. To inspect it:

```sh
aws iam get-open-id-connect-provider \
  --open-id-connect-provider-arn arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com
```

This will show the URL, client ID list, and thumbprint. If `token.actions.githubusercontent.com` is already there, you're done — skip straight to creating an IAM role.

### Create the provider

If it doesn't exist yet, create it:

```sh
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

- `--url` — the issuer URL for GitHub's OIDC service. This is what uniquely identifies the provider in AWS.
- `--client-id-list` — the "audience" that tokens must be issued for. Using `sts.amazonaws.com` is the standard here and matches what the `configure-aws-credentials` action requests.
- `--thumbprint-list` — the TLS certificate thumbprint for the issuer URL. AWS uses this to verify it's talking to the real GitHub OIDC endpoint. The thumbprint above is correct as of writing, but if you want to verify it yourself, GitHub documents the current value in their OIDC [docs](https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/about-security-hardening-with-openid-connect).

This only needs to be done once per AWS account.

## Create an IAM role

Each project or workflow needs its own IAM role that GitHub's identity token can assume. The trust policy is where you control which repos, branches, or environments are allowed to assume the role.

Since the OIDC provider is shared infrastructure, the role itself belongs in each project's own Terraform. Use `data.aws_caller_identity` to avoid hardcoding the account ID:

```hcl
data "aws_caller_identity" "current" {}

resource "aws_iam_role" "github_deploy" {
  name = "github-deploy-my-repo"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:oidc-provider/token.actions.githubusercontent.com"
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:my-org/my-repo:ref:refs/heads/main"
          }
        }
      }
    ]
  })
}
```

The `sub` claim is how AWS knows which GitHub repo is allowed to assume this role — more on that in the security section below.

## Attach permissions

The role needs whatever permissions your workflow actually requires. Don't reach for `AdministratorAccess` — give it only what it needs.

Here's an example scoped to uploading files to S3 and updating a Lambda function's code:

```hcl
resource "aws_iam_policy" "github_deploy" {
  name = "github-deploy-my-repo"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["s3:PutObject", "s3:DeleteObject"]
        Resource = "arn:aws:s3:::my-bucket/*"
      },
      {
        Effect   = "Allow"
        Action   = "lambda:UpdateFunctionCode"
        Resource = "arn:aws:lambda:eu-west-1:${data.aws_caller_identity.current.account_id}:function:my-function"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "github_deploy" {
  role       = aws_iam_role.github_deploy.name
  policy_arn = aws_iam_policy.github_deploy.arn
}
```

## GitHub Actions workflow

On the GitHub side, the workflow needs two things: permission to request an OIDC token, and a step that exchanges it for AWS credentials.

```yaml
name: Deploy

on:
  push:
    branches:
      - main

permissions:
  id-token: write   # required to request the OIDC token
  contents: read    # required to checkout the repo

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/github-deploy-my-repo
          aws-region: eu-west-1

      - name: Deploy
        run: |
          # your deployment commands here
```

The `configure-aws-credentials` action handles the OIDC token exchange and sets the standard `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_SESSION_TOKEN` environment variables for the rest of the job. The credentials are short-lived — they expire after an hour or so by default.

## Security Checklist

### Scope the `sub` condition
This is important. Without a `Condition` block restricting the `sub` claim, any GitHub Actions workflow in *any* repo could assume your role (as long as they know its ARN, which isn't secret). Always lock it down to at least a specific repo.

The `sub` claim format varies depending on what triggered the workflow:

```
# Any event in a repo
repo:my-org/my-repo:*

# A specific branch
repo:my-org/my-repo:ref:refs/heads/main

# A specific GitHub environment
repo:my-org/my-repo:environment:production

# A specific tag
repo:my-org/my-repo:ref:refs/tags/v1.2.3
```

Using `StringLike` (as in the example above) lets you use wildcards. `StringEquals` requires an exact match. For a branch-triggered deploy you probably want `StringEquals` to avoid unintended matches.

### Don't give the role too much access

It's tempting to give the deploy role broad access, but that means a compromised (or more likely buggy 😅) workflow can do anything in your account. Scope it to what the deploy actually needs.

### The role ARN isn't a secret

You don't need to store it as a GitHub secret. Hardcode it in the workflow YAML or set it as a non-secret environment variable. Obscuring the role ARN adds no real security — the trust policy conditions are what protect it.
