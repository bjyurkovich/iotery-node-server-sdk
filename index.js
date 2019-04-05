const api = require("./spec/api.json");
const { findParamArguments, generateQueryString } = require("./utils");
const fetch = require("node-fetch");

function Iotery(apiKey, opts) {
  if (!(this instanceof Iotery)) {
    return new Iotery(apiKey, opts);
  }

  if (opts && opts.baseUrl) {
    this.setBaseUrl(opts.baseUrl);
  }

  if (!apiKey) {
    throw Error(
      "iotery.io API key required.  Register for a free account to get your key at https://iotery.io"
    );
  }

  this.setApiKey(apiKey);
}

Iotery.prototype = {
  setApiKey: function(key) {
    this._apiKey = key;
  },

  setBaseUrl: function(baseUrl) {
    this._baseUrl = baseUrl;
  }
};

api.routes.forEach(e => {
  switch (e.method) {
    case "GET":
      Iotery.prototype[e.name] = async function(params, opts) {
        let out = findParamArguments(e.path, params);
        let res = await fetch(
          `${this._baseUrl}${out.hydratedPath}${generateQueryString(opts)}`,
          {
            method: e.method,
            headers: {
              "X-API-Key": Iotery.prototype._apiKey,
              "Content-Type": "application/json"
            }
          }
        );
        if (res.status >= 400) {
          throw res.error;
        }

        return await res.json();
      };
      break;
    case "POST":
      Iotery.prototype[e.name] = async function(params, data, opts) {
        let out = findParamArguments(e.path, params);
        let res = await fetch(
          `${this._baseUrl}${out.hydratedPath}${generateQueryString(opts)}`,
          {
            method: e.method,
            headers: {
              "X-API-Key": this._apiKey,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }
        );
        if (res.status >= 400) {
          throw res.error;
        }

        return await res.json();
      };
      break;
    case "PATCH":
      Iotery.prototype[e.name] = async function(params, data) {
        let out = findParamArguments(e.path, params);

        return await {
          path: `${this._baseUrl}${out.hydratedPath}`,
          data
        };
      };
      break;
    case "DELETE":
      Iotery.prototype[e.name] = async function(params) {
        let out = findParamArguments(e.path, params);

        return await `${this._baseUrl}${out.hydratedPath}`;
      };
      break;
  }
});

module.exports = Iotery;
