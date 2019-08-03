#!/bin/bash
node ./spec/genApi.js
node ./spec/genDocs.js
git add .
git commit -m "update docs"
git push origin master
git push github master
npm version patch -m "Upgrade docs"
npm publish