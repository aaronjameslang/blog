---
layout: page
title: Reproducible Node Installations
tags: software node
---

# Reproducible Node Installations

As anyone who's had to operate a legacy node application will tell you,
step one is being able to install the damn thing.

Let's go over some of the steps that we can take in our projects to make
installations reproducible for years to come.

## Node Version Manager (nvm)

If you're not familiar with the [node version manager](https://github.com/nvm-sh/nvm),
I recommend installing it and using on all your applications new and old.

Contributors should be responsible for installing nvm on their systems,
similar to git or their preferred IDE.

Once set up we can take a snapshot of our current node version with
`node --version > .nvmrc`. This will create a `.nvmrc` file which records
the node version the application is known to work with, similar to how
`package-lock.json` records the exact version of each node module dependency.

Then when working with your application, before running `npm install`, we
can run `nvm install` which will install the correct version of node if
we don't have it already, and ensure that our local environment is set
up to use that version.

Unfortunately there's no way to do anything similar with your `npm` version,
so the best approach I've found is to use `nvm install --lastest-npm` which will
ensure you always have the latest version.

## Clean `npm` Installs

The standard install command `npm install` will try to be smart by only installing
the node modules that are missing, and updating your `package-lock.json` file
for you if it's out of sync with your `package.json`. This is useful as part of
regular development, but not when you want to install *exactly* what worked last time.

For this `npm` gives us `npm ci` ("clean install"). You can read the
[documentation](https://docs.npmjs.com/cli/v8/commands/npm-ci) for the
full picture, but essentially don't use `npm install` unless you're
intending to update the application in some way, and have time for the
necessary testing.

## Documentation

Once you've gone to the trouble to set this up, ensure you add installation
instructions to your read-me and/or other documents.

```sh
nvm install --latest-npm && npm ci
```
