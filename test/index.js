const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
const api = require("../spec/api.json");
const { findArguments } = require("../utils");
const fetch = require("node-fetch");
const _ = require("lodash");
let iotery;

chai.use(chaiAsPromised);

describe("Node iotery SDK tests", function() {
  it("should import the iotery module", async () => {
    iotery = require("../")("iotery-api-mock-key", {
      baseUrl: "http://localhost:3005"
    });
    return expect(iotery).to.have.property("createDevice");
  });

  it("should check for the mock server to be running", async () => {
    let r;
    try {
      r = await fetch("http://localhost:3005/device-types", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
    } catch (err) {
      throw Error("Mock Server not running");
    }

    return expect(await r.json()).to.have.property("params");
  });

  it("should get a device", async () => {
    device = await iotery.getDeviceTypeByUuid({
      deviceTypeUuid: "duuid"
    });

    expect(device.params.deviceTypeUuid).to.equal("duuid");
    return;
  });

  it("should test all routes", async () => {
    api.routes.forEach(async e => {
      let { args } = findArguments(e.path);
      let input = {};
      args.forEach(a => (input[a] = `${a}-${e.method}-${e.name}`));

      let res = await eval(
        `iotery.${e.name}(${JSON.stringify(input)}, ${
          e.method === "POST" || e.method === "PATCH"
            ? JSON.stringify({ data: "some data" })
            : "{}"
        })`
      );

      expect(_.isEqual(input, res.params)).to.equal(true);
    });
    return;
  });
});
