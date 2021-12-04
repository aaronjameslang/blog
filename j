#! /bin/sh
set -eux

PATH=$PATH:~/.gem/ruby/2.7.0/bin/

test -d vendor/bundle || bundle install
bundle exec jekyll "$@"
