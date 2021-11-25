#! /bin/sh
set -eux

test -d vendor/bundle || bundle install
bundle exec jekyll "$@"
