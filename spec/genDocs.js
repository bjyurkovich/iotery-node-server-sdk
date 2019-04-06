const api = require("./api.json");
const fs = require("fs");
const path = require("path");
const { findArguments, generateQueryString } = require("../utils");

let template = fs.readFileSync(__dirname + "/" + "template.md", "utf8");

let gets = [];
let patches = [];
let posts = [];
let deletes = [];

//process appropriate methods
let docs = api.routes.map(r => {
  let args = "";
  let params, out;
  switch (r.method) {
    case "GET":
      params = findArguments(r.path);
      gets.push({ ...r, params });
      break;
    case "POST":
      params = findArguments(r.path);
      posts.push({ ...r, params });
      break;
    case "PATCH":
      params = findArguments(r.path);
      patches.push({ ...r, params });
      break;
    case "DELETE":
      params = findArguments(r.path);
      deletes.push({ ...r, params });
      break;
  }
});

//set up table header
let headers = `|    \`methodName\`    | \`input\` | link |  \`description\`
|:-----------:|:-----------:|:-----------:|:-----------:|`;

// make the table rows
let gs = gets
  .map(
    g =>
      `| ${g.name} | ${g.params.args.join(",")} | [link](${g.link}) | ${
        g.description
      } |`
  )
  .join("\n");

let pos = posts
  .map(
    g =>
      `| ${g.name} | ${g.params.args.join(",")} | [link](${g.link}) | ${
        g.description
      } |`
  )
  .join("\n");

let pas = patches
  .map(
    g =>
      `| ${g.name} | ${g.params.args.join(",")} | [link](${g.link}) | ${
        g.description
      } |`
  )
  .join("\n");

let dels = deletes
  .map(
    g =>
      `| ${g.name} | ${g.params.args.join(",")} | [link](${g.link}) | ${
        g.description
      } |`
  )
  .join("\n");

template = template.replace("[[GETS]]", [headers, gs].join("\n"));
template = template.replace("[[POSTS]]", [headers, pos].join("\n"));
template = template.replace("[[PATCHES]]", [headers, pas].join("\n"));
template = template.replace("[[DELETES]]", [headers, dels].join("\n"));

fs.writeFileSync(__dirname + "/" + "../README.md", template);
