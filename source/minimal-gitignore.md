---
layout: page
title: Minimal Git-Ignore
tags: software node
---

# Minimalism with `.gitignore`

In engineering as in many parts of life, often less is more.  Less code
mean less writing, less debugging, and less code for new contributors
wade through. Having unncessary or noisy code exacts a small but ongoing tax
on anyone working on the application, particularly new contributors who may have
a harder time sperating the noise from the core logic.

One way we can minimise our code base is our `.gitignore` files.

How many times have you needed to add a new line to the `.gitignore` of
a simple application only to be greeted by something like this:

```
# dependencies
node_modules

# testing
/coverage

# next.js
.next/
out/

# production
/build

# misc
.DS_Store
*.pem
.idea

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# vercel
.vercel
```

Let's see how we can improve this step by step. I'm going to use exmaples
from a sample application but the principles can be genrealised.

## Remove Superflous Entries

This file contains both `out` and `build`, does our project actually use both?
In fact this project does not produce static artifacts at all but is simply run with `npm start` even in production, so we can remove both these entries.

`*.pem` (privacy enhanced mail) are SSL key container files, that have no relation to our Next.js powered web server.
We remove this too, it's easy enugh to re-add if we later discovered why it's here.

Debug logs also don't need to be here. Unless these log files are a regular part of the development
process for most contributors (which in my experience they rarely are) they can simple be created when needed
and deleted afterwards.

The `.env` files listed can also we mostly removed. In our exmaple application only `.env.local` is used,
and including refernces to other non-existant files will just mislead whoever has to support this application in a few months/years time.

While we are using Next.js, we are not using Vercel, so that line can also be removed.

So far we have this:

```
# dependencies
node_modules

# testing
/coverage

# next.js
.next/

# misc
.DS_Store
.idea

# local env files
.env.local
```

What an improvment so far!

## Factor out Personal Entries

Every developer is unique, and has their own preferred OS, IDE, etc.
For this reason it's best not to include OS or IDE specific entries in
an applications `.gitignore`, instead place them in your personal
`.gitignore` file.

Setting this us is fairly easy, first create a file *outside of any project*
to be your personal git ignore file. I keep mine at `~/.git-ignore`, this fits
in well with other configuration files such as `.vimrc` and `.gitconfig` and the hyphen
means it can't be mistaken for normal `.gitignore` file.

Then tell git where to find this file with a command like

```sh
git config --global core.excludesfile ~/.git-ignore
```

Now we can add entries such as `.DS_Store` (MacOS) and `.idea` (WebStorm)
to our personal file depending on our personal development system, and remove these entries
from the application's `.gitignore`.

With these entries removed we're left with

```
# dependencies
node_modules

# testing
/coverage

# next.js
.next/

# local env files
.env.local
```

## Leading Slashes

We see in our exmaple `/coverage` and `.next/`. Why not `coverage` or `/.next/`?

A leading slash tells git that this path is relative to the `.giignore` file.
`coverage` would match a file or directory anywhere in the codebase with that name.

For specificty, always include a leading slash unless you deliberatly want this match-anywhere behaviour.

```
# dependencies
/node_modules

# testing
/coverage

# next.js
/.next/

# local env files
/.env.local
```

## Leading Slashes

We see in our exmaple `/coverage` and `.next/`. Why not `coverage` or `/.next/`?

A leading slash tells git that this path is relative to the `.giignore` file.
`coverage` would match a file or directory anywhere in the codebase with that name.

In many cases it can be optional, as we often don't have nested files with identical names only some of which we want to ignore.
But it's best to pick a style a stick with it, don't use it on some lines and not on others, unless that's require for the matching
behvaiour you want.

For specificty, I recommend always including a leading slash unless you deliberatly want this match-anywhere behaviour.

```
# dependencies
/node_modules

# testing
/coverage

# next.js
/.next/

# local env files
/.env.local
```

# Trailing Slashes

An entry with a trailing slash will only match directories, but one without
will match directories and files.

Again this is optional as in many cases it won't make a practical difference,
but it's still better to be consistent. Either always use a trailing slash for directories
or never do.

For maximum specificity, use a trailing slash where you can.

```
# dependencies
/node_modules/

# testing
/coverage/

# next.js
/.next/

# local env files
/.env.local
```

# Asterisks

We don't have an entry like this in our exmaple, but don't write something like
`/coverage/*`. `/coverage/` will do exactly the same thing with less characters.

Something like `/coverage/*.js` is fine if there's a file such as
`/coverage/index.html` that you don't want to ignore for some reason.

# Comments

Do the comments in your `.gitignore` add anything useful, or are they just noise?

In our example, we can assume anyone working on a node project knows the significance
or the `node_modules` directory. Someone unclear about the purpose of the
`.env.local` isn't helped by the comment `local env file`. None of the
comments in our example are useful, so we can remove them.

# Alphabetise

This is something that will be more significant the longer the file
grows, but is a good habit to get in to. Anytime you have a list of
items in a codebase and their order isn't significant, alphabetise them
to make the list easier to scan.  This also has the benefit of often
placing related entries together, and highliting duplicate entries.

```
/.env.local
/.next/
/coverage/
/node_modules/
```

# Conclusion

We've taken a file 32 lines long and replaced it with 4 lines.
Much easier to reason about and maintain.
