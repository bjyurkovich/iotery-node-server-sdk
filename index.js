const api = require("./spec/api.json");
const { findParamArguments, generateQueryString } = require("./utils");

const fetch = require("node-fetch");

function Iotery(apiKey, opts) {
  if (!(this instanceof Iotery)) {
    return new Iotery(apiKey, opts);
  }

  if (opts && opts.baseUrl) {
    this.setBaseUrl(opts.baseUrl);
  } else {
    this.setBaseUrl("https://api.iotery.io/v1");
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
              "X-API-Key": this._apiKey,
              "Content-Type": "application/json"
            }
          }
        );
        let output;
        try {
          output = await res.json();
        } catch (err) {
          throw err;
        }
        if (res.status >= 400) {
          output = { status: res.status, json: output };
        }
        return output;
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

        let output;
        try {
          output = await res.json();
        } catch (err) {
          throw err;
        }
        if (res.status >= 400) {
          output = { status: res.status, json: output };
        }
        return output;
      };
      break;
    case "PATCH":
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
        let output;
        try {
          output = await res.json();
        } catch (err) {
          throw err;
        }
        if (res.status >= 400) {
          output = { status: res.status, json: output };
        }
        return output;
      };
      break;
    case "DELETE":
      Iotery.prototype[e.name] = async function(params, opts) {
        let out = findParamArguments(e.path, params);
        let res = await fetch(
          `${this._baseUrl}${out.hydratedPath}${generateQueryString(opts)}`,
          {
            method: e.method,
            headers: {
              "X-API-Key": this._apiKey,
              "Content-Type": "application/json"
            }
          }
        );
        let output;
        try {
          output = await res.json();
        } catch (err) {
          throw err;
        }
        if (res.status >= 400) {
          output = { status: res.status, json: output };
        }
        return output;
      };
      break;
  }
});

module.exports = Iotery;
