---
layout: page
title: GitHub Actions Guide
published: false
---

# GitHub Actions Guide

GitHub Actions automates tasks in your repository. This guide covers the key concepts and how to structure your workflows effectively.

## Core Concepts

### Workflows, Jobs, and Steps

A **workflow** contains one or more **jobs**, and each job contains one or more **steps**.

```
Workflow (.yml file)
└── Job (runs on a runner)
    └── Step (individual command or action)
```

| | Workflow | Job | Step |
|---|---|---|---|
| **Defined by** | A YAML file in `.github/workflows/` | `jobs:` section | `steps:` section |
| **Runs on** | Triggered by events (push, PR, etc.) | A fresh runner (VM) | Within the job's runner |
| **Parallelism** | One workflow per trigger | Jobs run in parallel by default | Steps run sequentially |
| **Shares state** | No | Jobs don't share filesystems | Steps share the same filesystem |
| **Dependencies** | Can trigger other workflows | `needs:` to depend on other jobs | Order in the list |

### Example Workflow

```yaml
name: CI                          # Workflow

on: push

jobs:
  build:                          # Job 1
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4 # Step 1
      - run: npm build            # Step 2

  test:                           # Job 2 (runs in parallel with build)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test
```

**Key point:** If you need to pass files between jobs, you must use `upload-artifact`/`download-artifact` since each job gets a fresh VM.

## Reusing Code

There are two main ways to share code between workflows: **reusable workflows** and **composite actions**.

### Reusable Workflows vs Composite Actions

| | Reusable Workflow | Composite Action |
|---|---|---|
| **Location** | `.github/workflows/` | `.github/actions/` or separate repo |
| **Runs as** | Separate job(s) | Steps within a job |
| **Can use** | Jobs, services, matrices | Only steps |
| **Secrets** | Must be passed explicitly | Inherited from caller |
| **Outputs** | Job-level outputs | Step-level outputs |

### When to Use Each

**Reusable workflow** — when you need:
- Multiple jobs (e.g., build + test in parallel)
- Job-level features like `services`, `strategy.matrix`, or `container`
- To run on a different runner than the caller

**Composite action** — when you need:
- Reusable steps within a single job
- To mix with other steps in the same job
- Simpler secret handling

### Composite Action Example

Create the action in `.github/actions/build/action.yml`:

```yaml
name: Build
description: Build the project
runs:
  using: composite
  steps:
    - uses: actions/setup-node@v4
      with:
        node-version: "20"
        cache: npm
    - run: npm ci
      shell: bash
    - run: npm run build
      shell: bash
```

Then use it in your workflow:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ./.github/actions/build
```

**Note:** The `checkout` step must come before using a local action, because the action definition lives in the repository.

### Reusable Workflow Example

Create the workflow in `.github/workflows/build.yml`:

```yaml
name: build
on:
  workflow_call:
    outputs:
      artifact-name:
        value: site
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: site
          path: dist
```

Call it from another workflow:

```yaml
jobs:
  build:
    uses: ./.github/workflows/build.yml
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: site
          path: dist
      # deploy steps...
```

## Common Patterns

### Parallel Jobs

If you want to run things in parallel (like a build and a linter), use multiple jobs within the same workflow:

```yaml
name: CI
on: pull_request

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run build

  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run lint
```

Jobs run in parallel by default. Use separate **workflows** when:
- They have different triggers (e.g., one on push, one on schedule)
- They're logically unrelated (e.g., CI vs. dependency updates)
- You want separate workflow status badges

### Conditional Steps

Run a step only on certain branches:

```yaml
- uses: some/deploy-action@v1
  if: github.ref == 'refs/heads/main'
```

### PR Builds Without Deploy

Build on PRs but only deploy from main:

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run build
      - uses: some/deploy-action@v1
        if: github.ref == 'refs/heads/main'
```

## Keeping Dependencies Updated

Use Dependabot to automatically create PRs when dependencies are outdated. Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "daily"
    open-pull-requests-limit: 1
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "daily"
    open-pull-requests-limit: 1
```

The `github-actions` ecosystem keeps your workflow actions (like `actions/checkout`) up to date.

## Summary

- **Workflows** are triggered by events and contain jobs
- **Jobs** run on fresh VMs, parallel by default
- **Steps** run sequentially within a job, sharing the filesystem
- Use **composite actions** for reusable steps within a job
- Use **reusable workflows** when you need job-level features
- Use **multiple jobs** for parallelism within a workflow
- Use **multiple workflows** for different triggers or unrelated tasks
