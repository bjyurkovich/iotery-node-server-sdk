# iotery.io Server SDK

The node.js iotery.io server SDK is intended to be used on your server in order to interact with the itoery.io IoT Platform. The SDK is a fully featured wrapper for the [REST API](https://somelink_to_swagger_docs).

## Getting Started

Setup your free account on [iotery.io]() and go to your [settings dashboard]() to get your server API Key.

After you get your key, install the SDK:

```bash
npm install iotery-server-sdk
```

And finally, some simple example usage:

```js
const iotery = require("iotery-server-sdk")("YOUR_IOTERY_API_KEY_HERE");

async function main() {
  let thermalSensorDeviceType = await iotery.createDeviceType(null, {
    enum: "THERMAL_SENSOR",
    name: "Thermal Sensor Type"
  });

  let device = await iotery.createDevice(null, {
    name: "My Device",
    deviceTypeUuid: thermalSensorDeviceType.uuid
  });

  let devices = await iotery.getDevices(null, {
    limit: 10
  });
}

main();
```

> The above code connects you to the iotary.io platform, creates a device type, and a device, then retrieves all your devices.

Next, you might want to create a data type for the the device type you created...here's an example snippet:

```js
let temperatureDataType = await iotery.createDataType(
  { deviceTypeUuid: thermalSensorDeviceType.uuid },
  {
    name: "Temperature",
    enum: "TEMPERATURE",
    units: "C",
    isNumber: true
  }
);
```

For a tutorial on setting up a full stack system in 15 minutes using iotery.io, check [this link](medium_article) out.

## API

This SDK simply wraps the [REST API](https://somelink_to_swagger_docs), so more information and specifics can be found there.

#### `getDeviceByUuid({deviceUuid: "deviceUuid"})`

_returns_ Promise

Gets a device by uuid

#### `createDevice({}, {data}, )`

_returns_ Promise
Creates a new device

#### `getDevices({}, opts)`

_returns_ Promise

Gets a list of devices

_options_ (`opts`) object

|   field   |                      description                      |
| :-------: | :---------------------------------------------------: |
|   limit   |            The number of devices to return            |
| afterUuid | The uuid of the device after which you want to return |

## Contributing

We welcome contributors and PRs! Let us know if you are interested!

## Testing

To test, start the `mock-server.js` in `/test` and use `mocha` to run `test/index.js`.
