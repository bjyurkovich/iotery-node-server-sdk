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

This SDK simply wraps the [REST API](https://somelink_to_swagger_docs), so more information and specifics can be found there. Since the API is a wrapper around the REST API, the syntax is standard for each of the Create, Read, Update, and Delete operations on iotery.io resources.

### Creating Resources

The generalized syntax for creating resources in iotery.io looks like:

```js
methodName({ input: "parameters" }, { data: "variables" });
```

For example, to create a device, the javascript would look like

```js
createDevice(
  { deviceTypeUuid: "a-valid-device-type-uuid" },
  { name: "My Device", other: "parameter" }
);
```

where `createDevice` maps to `methodName`, `deviceTypeUuid` maps to `input`, and `name` and `other` map to `data : "variables"` in the generalized form given above.

The available resource creation methods are

|    `methodName`    | `input` | link |  `description`
|:-----------:|:-----------:|:-----------:|:-----------:|
| createDeviceType |  | https://iotery.io/v1/docs#createDeviceType | Creates a new device type |
| createDevice | deviceTypeUuid | https://iotery.io/v1/docs#createDevice | Creates a new device with a given device type |

### Reading Resources

The generalized syntax for reading resources looks like:

```js
methodName({ input: "parameters" }, { query: "variables" });
```

For example, to get a device, the javascript would look like

```js
getDeviceByUuid({ deviceUuid: "a-valid-device-uuid" }, { limit: 1 });
```

where `getDeviceByUuid` maps to `methodName`, `deviceUuid` maps to `input`, and `limit` maps to `query` in the generalized form given above.

The available resource reading methods are

|    `methodName`    | `input` | link |  `description`
|:-----------:|:-----------:|:-----------:|:-----------:|
| getDeviceTypes |  | https://iotery.io/v1/docs#getDeviceTypes | Gets all device types |
| getDeviceTypeByUuid | deviceTypeUuid | https://iotery.io/v1/docs#getDeviceyTypeByUuid | Gets a device type by uuid |

### Updating Resources

The generalized syntax for updating resources in iotery.io looks like:

```js
methodName({ input: "parameters" }, { data: "variables to update" });
```

For example, to create a device, the javascript would look like

```js
updateDevice(
  { deviceUuid: "a-valid-device-uuid" },
  { name: "My New Device Name", other: "new value" }
);
```

where `updateDevice` maps to `methodName`, `deviceUuid` maps to `input`, and `name` and `other` map to `data : "variables to update"` in the generalized form given above.

The available update methods are

|    `methodName`    | `input` | link |  `description`
|:-----------:|:-----------:|:-----------:|:-----------:|
| updateDeviceType | deviceTypeUuid | https://iotery.io/v1/docs#updateDeviceType | Updates a device type by uuid |

### Deleting Resources

The generalized syntax for deleting resources looks like:

```js
methodName({ input: "parameters" });
```

For example, to delete a device, the javascript would look like

```js
deleteDevice({ deviceUuid: "a-valid-device-uuid" });
```

where `deleteDevice` maps to `methodName` and `deviceUuid` maps to `input` in the generalized form given above.

The available resource deleting methods are

|    `methodName`    | `input` | link |  `description`
|:-----------:|:-----------:|:-----------:|:-----------:|
| deleteDeviceType | deviceTypeUuid | https://iotery.io/v1/docs#deleteDeviceType | Deletes a device type by uuid |

## Contributing

We welcome contributors and PRs! Let us know if you are interested.

## Testing

To test, start the `mock-server.js` in `/test` and use `mocha` to run `test/index.js`.
