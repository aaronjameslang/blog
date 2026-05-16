# Blog

A personal blog built with Jekyll and the just-the-docs theme, hosted on GitHub Pages.

See it here: https://aaronjameslang.github.io/blog/

## Running Locally

First, install dependencies:

```sh
make install
```

You may receive errors if you do not have ruby or other pre-requisites. See the
[Jekyll installation guide](https://jekyllrb.com/docs/installation/) for your
operating system.

Start the development server with live reload:

```sh
make serve
```

The site will be available at http://localhost:4000/blog/

To build the site without serving:

```sh
make build
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
