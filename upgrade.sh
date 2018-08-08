#!/bin/sh

set -e

APM_TEST_PACKAGES=""
ATOM_LINT_WITH_BUNDLED_NODE="true"
ATOM_CHANNEL=stable

sudo apt-get install -y build-essential fakeroot libsecret-1-dev

curl -s -O https://raw.githubusercontent.com/atom/ci/master/build-package.sh
chmod u+x build-package.sh
./build-package.sh

git config --global user.email $GH_EMAIL
git config --global user.name $GH_USER

git remote add origin-master https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git > /dev/null 2>&1

git fetch origin-master
git checkout -b master-local origin-master/master

yarn upgrade --latest
git add .
git commit --allow-empty -m "updated dependencies [skip ci]"

yarn test
yarn deploy:patch

git push --quiet origin-master master-local:master
git push --quiet origin-master master-local:master --tags