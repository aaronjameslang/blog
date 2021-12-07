#! /bin/sh
set -eu

PATH=$PATH:~/.gem/ruby/2.7.0/bin/

if ! type gem > /dev/null
then
  echo Please install ruby, gem, and other required packages
  echo   see https://jekyllrb.com/docs/installation
  exit 1
fi

if ! type bundle > /dev/null || ! bundle -v | grep 2.2.33 > /dev/null
then
  gem install --user-install bundler:2.2.33
fi

if type xcrun > /dev/null
then
  # https://jekyllrb.com/docs/installation/macos
  export SDKROOT=$(xcrun --show-sdk-path)
fi

test -d vendor/bundle || bundle install
bundle exec jekyll "$@"
