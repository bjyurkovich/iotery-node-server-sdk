const api = require("./api.json");
const fs = require("fs");
const path = require("path");
const { findArguments, generateQueryString } = require("../utils");

let template = fs.readFileSync(__dirname + "/" + "template.md", "utf8");

let docs = api.routes
  .map(r => {
    let args = "";
    let params, out;
    switch (r.method) {
      case "GET":
        params = findArguments(r.path);
        out = params.args.map(e => `${e}: "${e}"`);
        args = `({${out.join(", ")}}${r.query ? `, opts` : ``})`;
        break;
      case "POST":
        params = findArguments(r.path);
        out = params.args.map(e => `${e}: "${e}"`);
        args = `({${out.join(", ")}}, {see [API](${r.link}) for fields}, ${
          r.query ? `, opts` : ``
        })`;
        break;
      case "PATCH":
        params = findArguments(r.path);
        out = params.args.map(e => `${e}: "${e}"`);
        args = `({${out.join(", ")}}, {see [API](${r.link}) for fields}, ${
          r.query ? `, opts` : ``
        })`;
        break;
      case "DELETE":
        params = findArguments(r.path);
        out = params.args.map(e => `${e}: "${e}"`);
        args = `({${out.join(", ")}}${r.query ? `, opts` : ``})`;
        break;
    }

    let opts = ``;
    if (r.query) {
      opts = Object.keys(r.query)
        .map(
          q => `| ${q}  | ${r.query[q]} |
    `
        )
        .join("");
      opts = `|    field    | description |
    |:-----------:|:-----------:|
    ${opts}`;
    }

    return `
    #### \`${r.name}${args}\`
    *returns* Promise
    ${r.description}
    ${opts.length > 0 ? `*options* (\`opts\`) object` : ""}
    ${opts}`;
  })
  .join("\n");

template = template.replace("[[INSERT_DOCS]]", docs);

fs.writeFileSync(__dirname + "/" + "../README.md", template);
