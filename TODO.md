# GitHub Actions Improvements

## Update Ruby version

CI uses Ruby 2.6 (end-of-life). Upgrade to Ruby 3.x for security patches.

## Build verification on PRs

Current workflow only runs on push to `main`. Add PR checks to prevent broken builds:

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

## HTML Proofer

Check for broken links, missing images, and invalid HTML:

```yaml
- name: Check HTML
  run: |
    gem install html-proofer
    htmlproofer _site --disable-external --allow-hash-href
```

## Markdown linting

Ensure consistent markdown formatting across articles:

```yaml
- uses: DavidAnson/markdownlint-cli2-action@v14
  with:
    globs: "source/**/*.md"
```

## Spell checking

Catch typos in posts:

```yaml
- uses: streetsidesoftware/cspell-action@v6
  with:
    files: "source/**/*.md"
```

## Improve build caching

Add Jekyll's build cache for faster builds.
