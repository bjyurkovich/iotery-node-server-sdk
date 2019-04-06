const expect = require("chai").expect;
const api = require("../spec/api.json");
const { findArguments } = require("../utils");
const _ = require("lodash");
let iotery;

describe("Node iotery SDK tests", function() {
  it("should import the iotery module", async () => {
    iotery = require("../")("iotery-api-mock-key", {
      baseUrl: "http://localhost:3005"
    });
    expect(iotery).to.have.property("createDevice");
  });

  it("should get a device", async () => {
    device = await iotery.getDeviceTypeByUuid({
      deviceTypeUuid: "duuid"
    });

    expect(device.params.deviceTypeUuid).to.equal("duuid");
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
  });
});
