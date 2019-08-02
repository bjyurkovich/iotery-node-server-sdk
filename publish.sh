#!/bin/bash
node ./spec/genApi.js
node ./spec/genDocs.js
npm version patch -m "Upgrade docs"
npm publish