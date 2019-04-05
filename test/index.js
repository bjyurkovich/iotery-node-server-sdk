const expect = require("chai").expect;
let iotery;

describe("Node iotery SDK tests", function() {
  it("should import the iotery module", async () => {
    iotery = require("../")("iotery-api-mock-key", {
      baseUrl: "http://localhost:3005"
    });
    expect(iotery).to.have.property("createDevice");
  });

  it("should get a device", async () => {
    device = await iotery.getDeviceByUuid({
      deviceUuid: "duuid"
    });

    expect(device.params.deviceUuid).to.equal("duuid");
  });
});

// (async () => {
//   let device = await iotery.createDevice(null, {
//     deviceTypeUuid: "asdf"
//   });

//   device = await iotery.getDeviceByUuid({
//     deviceUuid: "duuid",
//     accountUuid: "auuid"
//   });

//   console.log(device);
// })();

// const iotery = require("iotery-server-sdk")("YOUR_IOTERY_API_KEY_HERE");

// async function main() {
//   let thermalSensorDeviceType = await iotery.createDeviceType(null, {
//     enum: "THERMAL_SENSOR",
//     name: "Thermal Sensor Type"
//   });

//   let device = await iotery.createDevice(null, {
//     name: "My Device",
//     deviceTypeUuid: thermalSensorDeviceType.uuid
//   });

//   let temperatureDataType = await iotery.createDataType(
//     { deviceTypeUuid: thermalSensorDeviceType.uuid },
//     {
//       name: "Temperature",
//       enum: "TEMPERATURE",
//       units: "C",
//       isNumber: true
//     }
//   );

//   let data = await iotery.createDataRecord(
//     { deviceUuid: device.uuid },
//     {
//       packets: [
//         {
//           deviceUuid: device.uuid,
//           deviceTypeUuid: thermalSensorDeviceType.uuid,
//           timestamp: new Date().valueOf(),
//           temperature: 23.5
//         }
//       ]
//     }
//   );
// }

// let temperatureDataType = await iotery.createDataType(
//   { deviceTypeUuid: thermalSensorDeviceType.uuid },
//   {
//     name: "Temperature",
//     enum: "TEMPERATURE",
//     units: "C",
//     isNumber: true
//   }
// );
