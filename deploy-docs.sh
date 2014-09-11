#!/bin/bash
rm -rf docs/* || exit 0;
gulp buildDocs
(
cd docs
git init
git config user.name "Travis-CI"
git config user.email "travis@nodemeatspace.com"
git add .
if git commit -m "Deployed to Github Pages"; then
  git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
else
  exit 0;
fi;
)
