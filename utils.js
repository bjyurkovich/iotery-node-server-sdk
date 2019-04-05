module.exports.findParamArguments = function(path, obj) {
  let parts = path.split(/\//);
  let params = parts.filter(p => p.length > 0 && p[0] === ":");
  let args = params.map(p => p.substring(1, p.length));
  let out = {};
  let hydratedPath = path;
  args.forEach(e => {
    out[e] = obj[e];
    hydratedPath = hydratedPath.replace(`:${e}`, obj[e]);
  });

  return { args, out, hydratedPath };
};

module.exports.findArguments = function(path) {
  let parts = path.split(/\//);
  let params = parts.filter(p => p.length > 0 && p[0] === ":");
  let args = params.map(p => p.substring(1, p.length));

  return { args };
};

module.exports.generateQueryString = function(opts) {
  let query = "";
  if (opts && opts.query) {
    query =
      "?" +
      Object.keys(opts.query)
        .map(q => `${q}=${opts.query[q]}`)
        .join("&");
  }

  return query;
};
