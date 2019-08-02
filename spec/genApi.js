const _ = require("lodash");
const fs = require("fs");
const fetch = require("node-fetch");
const apiDocBase = "https://iotery.io/docs/account-manager";

const baseServerUrl = "https://api.iotery.io/v1/docs-json";

async function getDocsFromServer() {
  let amRes = await fetch(`${baseServerUrl}/account-manager`);
  let emRes = await fetch(`${baseServerUrl}/embedded`);
  return { accountManager: await amRes.json(), embedded: await emRes.json() };
}

getDocsFromServer().then(docs => {
  let api = docs.accountManager;
  let routes = Object.keys(api.paths).map(path => {
    let spec = api.paths[path];
    let methods = Object.keys(spec);

    let outArray = [];

    outArray.push(
      methods.map(m => {
        let methodSpec = spec[m];
        let out = {
          path,
          name: methodSpec.sdkName,
          method: m.toUpperCase(),
          description: methodSpec.summary,
          link:
            apiDocBase +
            "#tag/" +
            _.head(methodSpec.tags).replace(" ", "-") +
            "/paths/" +
            path.replace(/\//g, "~1") +
            "/" +
            m.toLowerCase()
        };

        return out;
      })
    );

    return _.flatten(outArray);
  });

  fs.writeFileSync(
    "./spec/api.json",
    JSON.stringify(
      {
        version: api.info.version,
        routes: _.flatten(routes)
      },
      null,
      2
    )
  );
});
