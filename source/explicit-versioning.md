---
layout: page
title: Explicit Versioning
tags: software ux

---

# Explicit Versioning

Versioning is an important part of software development, but simply
having a version number isn't much use if your users can't access it.

In almost every piece of software you've installed there'll be an
"About" menu with details on which version of the software you have.
Debugging issues if far easier if you know which version of your
software has the bug.

Visible version information is also important (although less common) for
software presented as a service, such as a web application. Both web
sites and APIs benefit from user-facing versioning, whether it's during
internal testing or in production.

Sometimes, knowing when an issue occured can narrow down the version
that caused it. This isn't a robust solution however, espicially if the
bug report doesn't specify a timezone. Caching issues can mean the user
may not be experiencing the version that's officially been deployed, and
[canary deployments](https://wa.aws.amazon.com/wat.concept.canary-deployment.en.html)
mean you could have multiple versions live at the same time and no way
to know which the user is seeing.

Explicit versioning is also useful during development and testing,
allowing developers, testers, project managers and operations to see
what version is available in which environment in real time so that
issue can be better reported, more easily reproduced and tested, and
more swiftly resolved.

Giving operational staff a way to check what version is live is also a
quick and easy smoke test after any deployment.

One way to acheive this is to include the below script as an early part
of your build process. It produces a `json` file which can easily be
imported/read/compiled during the build, and the data used to display
the version at runtime.

You can use the build information to display a version on the login
screen and/or subtley in the footer. If you choose to only display some
of the information, you can make the rest available as a tool-tip or via
`console.log`.  Or if you're building an API you can expose a `GET
/version` endpoint that returns the `json` as-is.

```sh
#! /bin/sh
set -eu

#   This file should be saved as scripts/build-info.sh or similar, and
# run early in the build process to allow other code to import/read/link
# the generated file and make the information available to the end user.

#   If the version you are building is tagged the tag will be used,
# like "v1.4.3"
#   If the version you are building is not tagged the previous tag will
# be used and the number of commits since the last tag and the hash of
# the current commit will be appended, like "v1.4.3-20-g1a5ef12"
#   If you have uncommitted changes, such as during development, "dirty"
# will be appended like "v1.4.3-dirty"
#   If you have not yet created any tags you will get the error
# "fatal: No names found, cannot describe anything". If needed you can
# tag your root commit v0.0.0
version=$(git describe --dirty --tags)

#   This is an ISO-8601 timestamp which can be easily interpreted by
# humans and most computer systems. The format is given explicity here
# to be compatible with mac and linux
when=$(date +%Y-%m-%dT%H:%M:%S%z)

#   The name of the current user account. It can be useful to know if
# the build was created manually/locally or by an automated system.
who=${USER-}

# You should add build-info.json to your .gitignore

cat << EOF > build-info.json
{
  "version": "$version",
  "when": "$when",
  "who": "$who"
}
EOF
```

Recording versions elsewhere such as `package.json` can be useful if
you're distributing a library for example, but the above script provides
continous, automatic and specific version information during development
and for systems which are continously deployed.

An example react component:

{% raw %}

```jsx
import buildInfo from '../build-info.json'

export const Footer = () => {
  return (
    <span>
      Copyright {new Date().toLocaleDateString(undefined, { year: 'numeric'})}
    </span>
    <span style={{ textAlign: 'right' }} title={JSON.stringify(buildInfo, null, 2)}>
      {buildInfo.version}
    </span>
  )
}
```

{% endraw %}

An example express route:

```js
const express = require('express')
const buildInfo = require('../build-info.json')

const app = express()

app.get('/build-info', function (req, res) {
  res.send(JSON.stringify(buildInfo, null, 2))
})
```
