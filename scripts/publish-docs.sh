#!/usr/bin/env bash
set -e

pushd ..
echo 'Check out branch gh-pages'
git checkout -b gh-pages

echo '---'
echo 'Add documentation folder'
git add -f documentation/*

echo '---'
echo 'commit changes'
git commit -m "deploy to gh-pages"

echo '---'
echo 'push to remote gh-pages'
git subtree push --prefix documentation origin gh-pages

echo '---'
echo 'checkout branch master'
git checkout test-gh-p

echo '---'
echo 'delete branch gh-pages'
git branch -D gh-pages

echo '---'
echo 'All done!'
