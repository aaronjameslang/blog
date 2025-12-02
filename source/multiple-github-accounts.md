---
layout: page
title: Multiple GitHub Accounts on One Machine
published: false
---

# Multiple GitHub Accounts on One Machine

If you have separate GitHub accounts for work and personal projects, you'll need to configure your machine to use the correct credentials and SSH keys for each. This guide covers setting up git config and SSH to handle multiple accounts seamlessly.

## Git Configuration

### Conditional Includes

Rather than manually setting your author details in each repository, use **conditional includes** to automatically apply the correct config based on the directory.

Add this to your global `~/.gitconfig`:

```gitconfig
# ~/.gitconfig

[user]
    name = Personal Name
    email = personal@example.com

[includeIf "gitdir:~/work/"]
    path = ~/.gitconfig-work
```

Then create `~/.gitconfig-work` with your work details:

```gitconfig
# ~/.gitconfig-work

[user]
    name = Work Name
    email = work@company.com
```

Now any repository under `~/work/` will use your work identity, whilst everything else uses your personal identity.

**Notes:**
- The trailing `/` in `gitdir:~/work/` is important — it matches all subdirectories
- Use `gitdir/i:` for case-insensitive matching (useful on macOS)

### Fixing Commits with the Wrong Author

If you've already made commits with the wrong author, amend the most recent commit:

```sh
git commit --amend --reset-author --no-edit
```

The `--reset-author` flag updates the author to match your current git config, so you don't need to type out the name and email again.

**Note:** If the commit has already been pushed, you'll need to force push (`git push --force`), which rewrites history — avoid this on shared branches.

## SSH Configuration

GitHub identifies you by your SSH key, so you'll need separate keys for each account.

### Generate SSH Keys

Create a key for each account:

```sh
ssh-keygen -t ed25519 -C "personal@example.com" -f ~/.ssh/id_ed25519_personal
ssh-keygen -t ed25519 -C "work@company.com" -f ~/.ssh/id_ed25519_work
```

Add each public key to the corresponding GitHub account under **Settings → SSH and GPG keys**.

### Configure SSH Hosts

Edit `~/.ssh/config` to define separate hosts for each account:

```
# ~/.ssh/config

Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_personal
    IdentitiesOnly yes

Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
    IdentitiesOnly yes
```

The `IdentitiesOnly yes` directive ensures SSH only uses the specified key, rather than trying all keys in your agent.

### Using the Correct Host

For personal repositories, clone as normal:

```sh
git clone git@github.com:username/repo.git
```

For work repositories, use the `github-work` host:

```sh
git clone git@github-work:company/repo.git
```

For existing repositories, update the remote URL:

```sh
git remote set-url origin git@github-work:company/repo.git
```

### Automating Host Selection

To avoid remembering which host to use, add this to your work git config:

```gitconfig
# ~/.gitconfig-work

[user]
    name = Work Name
    email = work@company.com

[url "git@github-work:"]
    insteadOf = git@github.com:
```

Now any `git@github.com:` URL will automatically rewrite to `git@github-work:` for repositories under your work directory.

## Verifying Your Setup

Check which identity git will use in a given directory:

```sh
git config user.name
git config user.email
```

Test SSH connectivity for each account:

```sh
ssh -T git@github.com
ssh -T git@github-work
```

Each should respond with a greeting for the corresponding GitHub username.
