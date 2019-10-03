#!/usr/bin/env bash
set -e

echo 'bulid client ...'
npm run build:client
echo 'check out branch gh-pages ...'
git checkout -b gh-pages
echo 'add client-dist folder'
git add -f client-dist
echo 'commit changes'
git commit -m "deploy to gh-pages"
echo 'push to remote gh-pages'
git push origin `git subtree split --prefix client-dist`:gh-pages --force
echo 'checkout branch master'
git checkout master
echo 'delete branch gh-pages'
git branch -D gh-pages
echo All done!
