# Blog

A personal blog built with Jekyll and the just-the-docs theme, hosted on GitHub Pages.

See it here: https://aaronjameslang.github.io/blog/

## Prerequisites

Install Ruby and the required dependencies. See the [Jekyll installation guide](https://jekyllrb.com/docs/installation/) for your operating system.

### macOS

```sh
brew install ruby
```

### Ubuntu/Debian

```sh
sudo apt install ruby-full build-essential
```

## Running Locally

Use the `j` wrapper script to run Jekyll commands:

```sh
./j serve
```

This will:

- Install bundler if needed
- Install gem dependencies
- Start the development server with live reload at http://localhost:4000/blog/

To build the site without serving:

```sh
./j build
```

The built site will be in the `_site/` directory.

## Adding New Posts

Create a new Markdown file in the `source/` directory:

```sh
touch source/my-new-post.md
```

Add front matter at the top of the file:

```yaml
---
layout: page
title: My New Post
---
```

Write your content below the front matter using Markdown.

For posts with additional assets (images, scripts), create a subdirectory:

```
source/my-new-post/
├── index.md
├── diagram.png
└── demo.js
```

## Deployment

Pushing to `main` triggers the GitHub Actions workflow, which builds and deploys to the `gh-pages` branch.
