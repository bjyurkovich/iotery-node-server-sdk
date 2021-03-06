# iotery.io Server SDK

The node.js iotery.io server SDK is intended to be used on your server in order to interact with the itoery.io IoT Platform. The SDK is a fully featured wrapper for the [REST API](https://iotery.io/docs).

## Getting Started

Setup your free account on [iotery.io](https://iotery.io/register-team-manager) and go to your [dashboard](https://iotery.io/system) to get your server API Key.

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

For a tutorial on setting up a full stack system in 15 minutes using iotery.io, check [this link](https://dev.to/bjyurkovich/get-started-with-your-iot-devices-using-iotery-io-4c2d) out.

## API

This SDK simply wraps the [REST API](https://iotery.io/docs), so more information and specifics can be found there. Since the API is a wrapper around the REST API, the syntax is standard for each of the Create, Read, Update, and Delete operations on iotery.io resources. All methods return a `Promise`.

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
| createAccountManager |  | [link](https://iotery.io/docs/account-manager#tag/Accout-Managers/paths/~1account-managers/post) | Create an account manager. |
| createConsumer |  | [link](https://iotery.io/docs/account-manager#tag/Consumers/paths/~1consumers/post) | Create a consumer. |
| linkConsumerToDevice | consumerUuid | [link](https://iotery.io/docs/account-manager#tag/Consumers/paths/~1consumers~1:consumerUuid~1devices/post) | Link a consumer to a device. |
| linkConsumerToNetwork | consumerUuid | [link](https://iotery.io/docs/account-manager#tag/Consumers/paths/~1consumers~1:consumerUuid~1networks/post) | Link a consumer to a network. |
| createConsumerSecret | consumerUuid | [link](https://iotery.io/docs/account-manager#tag/Consumers/paths/~1consumers~1:consumerUuid~1secrets/post) | Create a consumer secret for authentication. |
| createDeviceType |  | [link](https://iotery.io/docs/account-manager#tag/Device-Types/paths/~1device-types/post) | Create a device type. |
| createSettingType |  | [link](https://iotery.io/docs/account-manager#tag/Device-Setting-Types/paths/~1setting-types/post) | Create a setting type. |
| createDefaultSetting |  | [link](https://iotery.io/docs/account-manager#tag/Device-Default-Settings/paths/~1default-settings/post) | Create a default setting. |
| createDataType |  | [link](https://iotery.io/docs/account-manager#tag/Data-Types/paths/~1data-types/post) | Create a data type. |
| createDevice |  | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1devices/post) | Create a device. |
| createBatchedCommandInstances |  | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1devices~1command-instances/post) | Create a set of batched command instances. |
| clearUnexecutedDeviceCommandInstances | deviceUuid | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1devices~1:deviceUuid~1clear-unexecuted-command-instances/post) | Clear all unexecuted command instance for a device. |
| createDeviceCommandInstance | deviceUuid | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1devices~1:deviceUuid~1command-instances/post) | Create a command instance for a device. |
| createDeviceNotificationInstance | deviceUuid | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1devices~1:deviceUuid~1notification-instances/post) | Create a notification instance for a device. |
| createSetting | deviceUuid | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1devices~1:deviceUuid~1settings/post) | Create a setting for a device. |
| createFirmwareRecord |  | [link](https://iotery.io/docs/account-manager#tag/Firmware/paths/~1firmware/post) | Create a firmware record. |
| createSeverityType |  | [link](https://iotery.io/docs/account-manager#tag/Notification-Severity-Types/paths/~1severity-types/post) | Create a severity type. |
| createNotificationType |  | [link](https://iotery.io/docs/account-manager#tag/Notification-Types/paths/~1notification-types/post) | Create a notification type. |
| createNotificationField |  | [link](https://iotery.io/docs/account-manager#tag/Notification-Fields/paths/~1notification-fields/post) | Create a notification field. |
| createPriorityType |  | [link](https://iotery.io/docs/account-manager#tag/Command-Priority-Types/paths/~1priority-types/post) | Create a priority type. |
| createCommandType |  | [link](https://iotery.io/docs/account-manager#tag/Command-Types/paths/~1command-types/post) | Create a command type. |
| createCommandField |  | [link](https://iotery.io/docs/account-manager#tag/Command-Fields/paths/~1command-fields/post) | Create a command field. |
| createEventType |  | [link](https://iotery.io/docs/account-manager#tag/Event-Types/paths/~1event-types/post) | Create an event type. |
| createEvent |  | [link](https://iotery.io/docs/account-manager#tag/Events/paths/~1events/post) | Create an event. |
| createGroupingType |  | [link](https://iotery.io/docs/account-manager#tag/Grouping-Types/paths/~1grouping-types/post) | Create a grouping type. |
| createTeam |  | [link](https://iotery.io/docs/account-manager#tag/Teams/paths/~1teams/post) | Create a team. |
| resetTeam | teamUuid | [link](https://iotery.io/docs/account-manager#tag/Teams/paths/~1teams~1:teamUuid~1reset/post) | Reset a team by uuid. |
| linkAccountManagerToTeam | teamUuid | [link](https://iotery.io/docs/account-manager#tag/Teams/paths/~1teams~1:teamUuid~1users/post) | Link an account manager to a team. |
| createGroupingBatchedCommands | groupingUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1groupings~1:groupingUuid~1command-instances/post) | Create a set of batched commands for a grouping and all child grouping devices. |
| moveDeviceToGrouping | groupingUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1groupings~1:groupingUuid~1devices/post) | Move a device to a grouping. |
| createNetwork |  | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks/post) | Create a network. |
| createNetworkBatchedCommands | networkUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid~1command-instances/post) | Create a set of batched commands for a network's devices. |
| createGrouping | networkUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid~1groupings/post) | Create a network grouping. |
| addChildGrouping | networkUuid,groupingUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid~1groupings~1:groupingUuid~1child-groupings/post) | Add a child grouping. |
| createNetworkLocation | networkUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid~1network-locations/post) | Create a network location. |
| createSchedule | networkUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid~1schedules/post) | Create a schedule. |
| executeNetworkSchedule | networkUuid,scheduleUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid~1schedules~1:scheduleUuid~1execute/post) | Execute a schedule. |
| deprovisionNetwork | networkUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1deprovision-network~1networks~1:networkUuid/post) | Deprovision a network. |
| provisionNetwork |  | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1provision-network/post) | Provision a network. |
| provisionDevice | networkUuid,deviceUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1provision-device~1networks~1:networkUuid~1devices~1:deviceUuid/post) | Provision a device. |
| deprovisionDevice | networkUuid,deviceUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1deprovision-device~1networks~1:networkUuid~1devices~1:deviceUuid/post) | Deprovision a device. |
| executeSchedule | scheduleUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1schedules~1:scheduleUuid~1execute/post) | Execute a schedule. |
| createGroupingDevice |  | [link](https://iotery.io/docs/account-manager#tag/Links/paths/~1grouping-devices/post) | Create a GroupingDevice link. |
| createGroupingLink |  | [link](https://iotery.io/docs/account-manager#tag/Links/paths/~1grouping-links/post) | Create a GroupingLink. |
| createWebhookAction |  | [link](https://iotery.io/docs/account-manager#tag/Webhooks/paths/~1webhook-actions/post) | Create a webhook action. |
| createQrCode |  | [link](https://iotery.io/docs/account-manager#tag/QR-Codes/paths/~1qr-codes/post) | Create a QR code. |
| createIoteryTemplate |  | [link](https://iotery.io/docs/account-manager#tag/Iotery-Templates/paths/~1iotery-templates/post) | Create an iotery template. |
| applyIoteryTemplate | ioteryTemplateUuid | [link](https://iotery.io/docs/account-manager#tag/Iotery-Templates/paths/~1iotery-templates~1:ioteryTemplateUuid~1apply/post) | Apply an iotery template by uuid. |

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
| getHealthCheckResult |  | [link](https://iotery.io/docs/account-manager#tag/Iotery-Health-Check/paths/~1health-check/get) | Get the result of a server health check. |
| getAccountManager | userUuid | [link](https://iotery.io/docs/account-manager#tag/Accout-Managers/paths/~1account-managers~1:userUuid/get) | Get an account manager by uuid. |
| getConsumerList |  | [link](https://iotery.io/docs/account-manager#tag/Consumers/paths/~1consumers/get) | Get a list of available consumers. |
| getConsumer | consumerUuid | [link](https://iotery.io/docs/account-manager#tag/Consumers/paths/~1consumers~1:consumerUuid/get) | Get a consumer by uuid. |
| getConsumerDeviceList | consumerUuid | [link](https://iotery.io/docs/account-manager#tag/Consumers/paths/~1consumers~1:consumerUuid~1devices/get) | Get a list of devices linked to a consumer. |
| getConsumerNetworkList | consumerUuid | [link](https://iotery.io/docs/account-manager#tag/Consumers/paths/~1consumers~1:consumerUuid~1networks/get) | Get a list of networks linked to a consumer. |
| getDeviceTypeList |  | [link](https://iotery.io/docs/account-manager#tag/Device-Types/paths/~1device-types/get) | Get a list of available device types. |
| getDeviceType | deviceTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Device-Types/paths/~1device-types~1:deviceTypeUuid/get) | Get a device type by uuid. |
| getSettingTypeList |  | [link](https://iotery.io/docs/account-manager#tag/Device-Setting-Types/paths/~1setting-types/get) | Get a list of available setting types. |
| getSettingType | settingTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Device-Setting-Types/paths/~1setting-types~1:settingTypeUuid/get) | Get a setting type by uuid. |
| getDefaultSettingList |  | [link](https://iotery.io/docs/account-manager#tag/Device-Default-Settings/paths/~1default-settings/get) | Get a list of default settings. |
| getDefaultSetting | defaultSettingUuid | [link](https://iotery.io/docs/account-manager#tag/Device-Default-Settings/paths/~1default-settings~1:defaultSettingUuid/get) | Get a default setting by uuid. |
| getDataTypeList |  | [link](https://iotery.io/docs/account-manager#tag/Data-Types/paths/~1data-types/get) | Get a list of available data types. |
| getDataType | dataTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Data-Types/paths/~1data-types~1:dataTypeUuid/get) | Get a data type by uuid. |
| getCommandInstanceList |  | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1command-instances/get) | Get a list of command instances. |
| getCommandInstance | commandInstanceUuid | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1command-instances~1:commandInstanceUuid/get) | Get a command instance by uuid. |
| getDeviceList |  | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1devices/get) | Get a list of devices. |
| getDevice | deviceUuid | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1devices~1:deviceUuid/get) | Get a device by uuid. |
| getDeviceDataList | deviceUuid | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1devices~1:deviceUuid~1data/get) | Get a list of data for a device. |
| getDeviceEventList | deviceUuid | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1devices~1:deviceUuid~1events/get) | Get a list of events for a device. |
| getDeviceIsppConfiguration | deviceUuid | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1devices~1:deviceUuid~1ispp-configuration/get) | Get an ISPP configuration for a device. |
| getDeviceNotificationInstanceList | deviceUuid | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1devices~1:deviceUuid~1notification-instances/get) | Get a list of notification instances for a device. |
| getDeviceSettingList | deviceUuid | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1devices~1:deviceUuid~1settings/get) | Get a list of settings for a device. |
| getDeviceSystemEventList | deviceUuid | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1devices~1:deviceUuid~1system-events/get) | Get a list of system events for a device. |
| getNotificationInstance | notificationInstanceUuid | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1notification-instances~1:notificationInstanceUuid/get) | Get a notification instance by uuid. |
| getSetting | settingUuid | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1settings~1:settingUuid/get) | Get a setting by uuid. |
| getFirmwareRecordList |  | [link](https://iotery.io/docs/account-manager#tag/Firmware/paths/~1firmware/get) | Get a list of firmware records. |
| getFirmwareRecord | firmwareUuid | [link](https://iotery.io/docs/account-manager#tag/Firmware/paths/~1firmware~1:firmwareUuid/get) | Get a firmware record by uuid. |
| getSeverityTypeList |  | [link](https://iotery.io/docs/account-manager#tag/Notification-Severity-Types/paths/~1severity-types/get) | Get a list of available severity types. |
| getSeverityType | severityTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Notification-Severity-Types/paths/~1severity-types~1:severityTypeUuid/get) | Delete a severity type by uuid. |
| getNotificationTypeList |  | [link](https://iotery.io/docs/account-manager#tag/Notification-Types/paths/~1notification-types/get) | Get a list of available notification types. |
| getNotificationType | notificationTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Notification-Types/paths/~1notification-types~1:notificationTypeUuid/get) | Get a notification type by uuid. |
| getNotificationFieldList |  | [link](https://iotery.io/docs/account-manager#tag/Notification-Fields/paths/~1notification-fields/get) | Get a list of available notification fields. |
| getNotificationField | notificationFieldUuid | [link](https://iotery.io/docs/account-manager#tag/Notification-Fields/paths/~1notification-fields~1:notificationFieldUuid/get) | Get a notification field by uuid. |
| getPriorityTypeList |  | [link](https://iotery.io/docs/account-manager#tag/Command-Priority-Types/paths/~1priority-types/get) | Get a list of available priority types. |
| getPriorityType | priorityTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Command-Priority-Types/paths/~1priority-types~1:priorityTypeUuid/get) | Get a priority type by uuid. |
| getCommandTypeList |  | [link](https://iotery.io/docs/account-manager#tag/Command-Types/paths/~1command-types/get) | Get a list of available command types. |
| getCommandType | commandTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Command-Types/paths/~1command-types~1:commandTypeUuid/get) | Get a command type by uuid. |
| getCommandFieldList |  | [link](https://iotery.io/docs/account-manager#tag/Command-Fields/paths/~1command-fields/get) | Get a list of available command fields. |
| getCommandField | commandFieldUuid | [link](https://iotery.io/docs/account-manager#tag/Command-Fields/paths/~1command-fields~1:commandFieldUuid/get) | Get a command field by uuid. |
| getEventTypeList |  | [link](https://iotery.io/docs/account-manager#tag/Event-Types/paths/~1event-types/get) | Get a list of available event types. |
| getEventType | eventTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Event-Types/paths/~1event-types~1:eventTypeUuid/get) | Get an event type by uuid. |
| getEventList |  | [link](https://iotery.io/docs/account-manager#tag/Events/paths/~1events/get) | Get a list of events. |
| getEvent | eventUuid | [link](https://iotery.io/docs/account-manager#tag/Events/paths/~1events~1:eventUuid/get) | Get an event by uuid. |
| getGroupingTypeList |  | [link](https://iotery.io/docs/account-manager#tag/Grouping-Types/paths/~1grouping-types/get) | Get a list of available grouping types. |
| getGroupingType | groupingTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Grouping-Types/paths/~1grouping-types~1:groupingTypeUuid/get) | Get a grouping type by uuid. |
| getTeamList |  | [link](https://iotery.io/docs/account-manager#tag/Teams/paths/~1teams/get) | Get a list of available teams. |
| getTeam | teamUuid | [link](https://iotery.io/docs/account-manager#tag/Teams/paths/~1teams~1:teamUuid/get) | Get a team by uuid. |
| getUserListForTeam | teamUuid | [link](https://iotery.io/docs/account-manager#tag/Teams/paths/~1teams~1:teamUuid~1users/get) | Get a list of users for a team. |
| getGrouping | groupingUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1groupings~1:groupingUuid/get) | Get a grouping by uuid. |
| getChildGroupingList | groupingUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1groupings~1:groupingUuid~1child-groupings/get) | Get a list of child groupings for a grouping. |
| getDeviceListForGrouping | groupingUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1groupings~1:groupingUuid~1devices/get) | Get a list of devices for a grouping. |
| getNetworkList |  | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks/get) | Get a list of networks. |
| getNetwork | networkUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid/get) | Get a network by uuid. |
| getNetworkDeviceList | networkUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid~1devices/get) | Get a network's devices. |
| getNetworkGroupingList | networkUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid~1groupings/get) | Get a network's groupings. |
| getNetworkGrouping | networkUuid,groupingUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid~1groupings~1:groupingUuid/get) | Get a network's grouping by uuid. |
| getNetworkLocationList | networkUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid~1network-locations/get) | Get a network's locations. |
| getNetworkLocation | networkUuid,networkLocationUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid~1network-locations~1:networkLocationUuid/get) | Get a network location by uuid. |
| getNetworkScheduleList | networkUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid~1schedules/get) | Get a list of a network's schedules. |
| getNetworkSchedule | networkUuid,scheduleUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid~1schedules~1:scheduleUuid/get) | Get a schedule by uuid. |
| getSchedule | scheduleUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1schedules~1:scheduleUuid/get) | Get a schedule by uuid. |
| getGroupingDeviceList |  | [link](https://iotery.io/docs/account-manager#tag/Links/paths/~1grouping-devices/get) | Get a list of GroupingDevice links. |
| getGroupingDevice | groupingDeviceUuid | [link](https://iotery.io/docs/account-manager#tag/Links/paths/~1grouping-devices~1:groupingDeviceUuid/get) | Get a GroupingDevice link by uuid. |
| getGroupingLinkList |  | [link](https://iotery.io/docs/account-manager#tag/Links/paths/~1grouping-links/get) | Get a list of GroupingLinks. |
| getGroupingLink | groupingLinkUuid | [link](https://iotery.io/docs/account-manager#tag/Links/paths/~1grouping-links~1:groupingLinkUuid/get) | Get a GroupingLink by uuid. |
| getWebhookActionList |  | [link](https://iotery.io/docs/account-manager#tag/Webhooks/paths/~1webhook-actions/get) | Get a list of webhook actions. |
| getWebhookAction | webhookActionUuid | [link](https://iotery.io/docs/account-manager#tag/Webhooks/paths/~1webhook-actions~1:webhookActionUuid/get) | Get a webhook action by uuid. |
| getWebhookActionTypeList |  | [link](https://iotery.io/docs/account-manager#tag/Webhooks/paths/~1webhook-action-types/get) | Get a list of webhook action types. |
| getWebhookActionType | webhookActionTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Webhooks/paths/~1webhook-action-types~1:webhookActionTypeUuid/get) | Get a webhook action type by uuid. |
| getQrCodeList |  | [link](https://iotery.io/docs/account-manager#tag/QR-Codes/paths/~1qr-codes/get) | Get a list of QR codes. |
| getQrCode | qrCodeUuid | [link](https://iotery.io/docs/account-manager#tag/QR-Codes/paths/~1qr-codes~1:qrCodeUuid/get) | Get a QR code by uuid. |
| getIoteryTemplateList |  | [link](https://iotery.io/docs/account-manager#tag/Iotery-Templates/paths/~1iotery-templates/get) | Get a list of iotery templates. |
| getIoteryTemplate | ioteryTemplateUuid | [link](https://iotery.io/docs/account-manager#tag/Iotery-Templates/paths/~1iotery-templates~1:ioteryTemplateUuid/get) | Get an iotery template by uuid. |

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
| updateAccountManager | userUuid | [link](https://iotery.io/docs/account-manager#tag/Accout-Managers/paths/~1account-managers~1:userUuid/patch) | Update an account manager by uuid. |
| updateConsumer | consumerUuid | [link](https://iotery.io/docs/account-manager#tag/Consumers/paths/~1consumers~1:consumerUuid/patch) | Update a consumer by uuid. |
| updateDeviceType | deviceTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Device-Types/paths/~1device-types~1:deviceTypeUuid/patch) | Update a device type by uuid. |
| updateSettingType | settingTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Device-Setting-Types/paths/~1setting-types~1:settingTypeUuid/patch) | Update a setting type by uuid. |
| updateDefaultSetting | defaultSettingUuid | [link](https://iotery.io/docs/account-manager#tag/Device-Default-Settings/paths/~1default-settings~1:defaultSettingUuid/patch) | Update a default setting by uuid. |
| updateDataType | dataTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Data-Types/paths/~1data-types~1:dataTypeUuid/patch) | Update a data type by uuid. |
| updateCommandInstance | commandInstanceUuid | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1command-instances~1:commandInstanceUuid/patch) | Update a command instance by uuid. |
| updateDevice | deviceUuid | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1devices~1:deviceUuid/patch) | Update a device by uuid. |
| updateNotificationInstance | notificationInstanceUuid | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1notification-instances~1:notificationInstanceUuid/patch) | Update a notification instance. |
| updateSetting | settingUuid | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1settings~1:settingUuid/patch) | Update a setting. |
| updateFirmwareRecord | firmwareUuid | [link](https://iotery.io/docs/account-manager#tag/Firmware/paths/~1firmware~1:firmwareUuid/patch) | Update a firmware record by uuid. |
| updateSeverityType | severityTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Notification-Severity-Types/paths/~1severity-types~1:severityTypeUuid/patch) | Update a severity type by uuid. |
| updateNotificationType | notificationTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Notification-Types/paths/~1notification-types~1:notificationTypeUuid/patch) | Update a notification type by uuid. |
| updateNotificationField | notificationFieldUuid | [link](https://iotery.io/docs/account-manager#tag/Notification-Fields/paths/~1notification-fields~1:notificationFieldUuid/patch) | Update a notification field by uuid. |
| updatePriorityType | priorityTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Command-Priority-Types/paths/~1priority-types~1:priorityTypeUuid/patch) | Update a priority type by uuid. |
| updateCommandType | commandTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Command-Types/paths/~1command-types~1:commandTypeUuid/patch) | Update a command type by uuid. |
| updateCommandField | commandFieldUuid | [link](https://iotery.io/docs/account-manager#tag/Command-Fields/paths/~1command-fields~1:commandFieldUuid/patch) | Update a command field by uuid. |
| updateEventType | eventTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Event-Types/paths/~1event-types~1:eventTypeUuid/patch) | Update an event type by uuid. |
| updateEvent | eventUuid | [link](https://iotery.io/docs/account-manager#tag/Events/paths/~1events~1:eventUuid/patch) | Update an event by uuid. |
| updateGroupingType | groupingTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Grouping-Types/paths/~1grouping-types~1:groupingTypeUuid/patch) | Update a grouping type by uuid. |
| updateTeam | teamUuid | [link](https://iotery.io/docs/account-manager#tag/Teams/paths/~1teams~1:teamUuid/patch) | Update a team by uuid. |
| updateGrouping | groupingUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1groupings~1:groupingUuid/patch) | Update a grouping. |
| updateNetworkLocation | networkLocationUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1network-locations~1:networkLocationUuid/patch) | Update a network location by uuid. |
| updateNetwork | networkUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid/patch) | Update a network by uuid. |
| updateNetworkGrouping | networkUuid,groupingUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid~1groupings~1:groupingUuid/patch) | Update a network grouping. |
| updateNetworkNetworkLocation | networkUuid,networkLocationUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid~1network-locations~1:networkLocationUuid/patch) | Update a network location. |
| updateNetworkSchedule | networkUuid,scheduleUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid~1schedules~1:scheduleUuid/patch) | Update a schedule. |
| updateSchedule | scheduleUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1schedules~1:scheduleUuid/patch) | Update a schedule. |
| updateGroupingDevice | groupingDeviceUuid | [link](https://iotery.io/docs/account-manager#tag/Links/paths/~1grouping-devices~1:groupingDeviceUuid/patch) | Update a GroupingDevice link by uuid. |
| updateGroupingLink | groupingLinkUuid | [link](https://iotery.io/docs/account-manager#tag/Links/paths/~1grouping-links~1:groupingLinkUuid/patch) | Update a GroupingLink by uuid. |
| updateWebhookAction | webhookActionUuid | [link](https://iotery.io/docs/account-manager#tag/Webhooks/paths/~1webhook-actions~1:webhookActionUuid/patch) | Update a webhook action by uuid. |
| updateQrCode | qrCodeUuid | [link](https://iotery.io/docs/account-manager#tag/QR-Codes/paths/~1qr-codes~1:qrCodeUuid/patch) | Update a QR code by uuid. |

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
| deleteAccountManager | userUuid | [link](https://iotery.io/docs/account-manager#tag/Accout-Managers/paths/~1account-managers~1:userUuid/delete) | Delete an account manager by uuid. |
| deleteConsumer | consumerUuid | [link](https://iotery.io/docs/account-manager#tag/Consumers/paths/~1consumers~1:consumerUuid/delete) | Delete a consumer by uuid. |
| unlinkConsumerFromDevice | consumerUuid,deviceUuid | [link](https://iotery.io/docs/account-manager#tag/Consumers/paths/~1consumers~1:consumerUuid~1devices~1:deviceUuid/delete) | Unlink a consumer from a device. |
| unlinkConsumerFromNetwork | consumerUuid,networkUuid | [link](https://iotery.io/docs/account-manager#tag/Consumers/paths/~1consumers~1:consumerUuid~1networks~1:networkUuid/delete) | Unlink a consumer from a network. |
| deleteConsumerSecretList | consumerUuid | [link](https://iotery.io/docs/account-manager#tag/Consumers/paths/~1consumers~1:consumerUuid~1secrets/delete) | Delete all stored consumer secrets. |
| deleteDeviceType | deviceTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Device-Types/paths/~1device-types~1:deviceTypeUuid/delete) | Delete a device type by uuid. |
| deleteSettingType | settingTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Device-Setting-Types/paths/~1setting-types~1:settingTypeUuid/delete) | Delete a setting type by uuid. |
| deleteDefaultSetting | defaultSettingUuid | [link](https://iotery.io/docs/account-manager#tag/Device-Default-Settings/paths/~1default-settings~1:defaultSettingUuid/delete) | Delete a default setting by uuid. |
| deleteDataType | dataTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Data-Types/paths/~1data-types~1:dataTypeUuid/delete) | Delete a data type by uuid. |
| deleteDevice | deviceUuid | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1devices~1:deviceUuid/delete) | Delete a device by uuid. |
| deleteNotificationInstance | notificationInstanceUuid | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1notification-instances~1:notificationInstanceUuid/delete) | Delete a notification instance by uuid. |
| deleteSetting | settingUuid | [link](https://iotery.io/docs/account-manager#tag/Devices/paths/~1settings~1:settingUuid/delete) | Delete a setting by uuid. |
| deleteFirmwareRecord | firmwareUuid | [link](https://iotery.io/docs/account-manager#tag/Firmware/paths/~1firmware~1:firmwareUuid/delete) | Delete a firmware record by uuid. |
| deleteSeverityType | severityTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Notification-Severity-Types/paths/~1severity-types~1:severityTypeUuid/delete) | Delete a severity type by uuid. |
| deleteNotificationType | notificationTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Notification-Types/paths/~1notification-types~1:notificationTypeUuid/delete) | Delete a notification type by uuid. |
| deleteNotificationField | notificationFieldUuid | [link](https://iotery.io/docs/account-manager#tag/Notification-Fields/paths/~1notification-fields~1:notificationFieldUuid/delete) | Delete a notification field by uuid. |
| deletePriorityType | priorityTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Command-Priority-Types/paths/~1priority-types~1:priorityTypeUuid/delete) | Delete a priority type by uuid. |
| deleteCommandType | commandTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Command-Types/paths/~1command-types~1:commandTypeUuid/delete) | Delete a command type by uuid. |
| deleteCommandField | commandFieldUuid | [link](https://iotery.io/docs/account-manager#tag/Command-Fields/paths/~1command-fields~1:commandFieldUuid/delete) | Delete a command field by uuid. |
| deleteEventType | eventTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Event-Types/paths/~1event-types~1:eventTypeUuid/delete) | Delete an event type by uuid. |
| deleteEvent | eventUuid | [link](https://iotery.io/docs/account-manager#tag/Events/paths/~1events~1:eventUuid/delete) | Delete an event by uuid. |
| deleteGroupingType | groupingTypeUuid | [link](https://iotery.io/docs/account-manager#tag/Grouping-Types/paths/~1grouping-types~1:groupingTypeUuid/delete) | Delete a grouping type by uuid. |
| deleteTeam | teamUuid | [link](https://iotery.io/docs/account-manager#tag/Teams/paths/~1teams~1:teamUuid/delete) | Delete a team by uuid. |
| unlinkAccountManagerFromTeam | teamUuid,userUuid | [link](https://iotery.io/docs/account-manager#tag/Teams/paths/~1teams~1:teamUuid~1users~1:userUuid/delete) | Unlink account manager from a team. |
| deleteGrouping | groupingUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1groupings~1:groupingUuid/delete) | Delete a grouping by uuid. |
| deleteNetwork | networkUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid/delete) | Delete a network by uuid. |
| deleteNetworkGrouping | networkUuid,groupingUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid~1groupings~1:groupingUuid/delete) | Delete a network's grouping by uuid. |
| removeDeviceFromGrouping | networkUuid,groupingUuid,deviceUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid~1groupings~1:groupingUuid~1devices~1:deviceUuid/delete) | remove a device from a grouping |
| deleteNetworkLocation | networkUuid,networkLocationUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid~1network-locations~1:networkLocationUuid/delete) | Delete a network location by uuid. |
| deleteNetworkSchedule | networkUuid,scheduleUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1networks~1:networkUuid~1schedules~1:scheduleUuid/delete) | Delete a schedule by uuid. |
| deleteSchedule | scheduleUuid | [link](https://iotery.io/docs/account-manager#tag/Networks/paths/~1schedules~1:scheduleUuid/delete) | Delete a schedule by uuid. |
| deleteGroupingDevice | groupingDeviceUuid | [link](https://iotery.io/docs/account-manager#tag/Links/paths/~1grouping-devices~1:groupingDeviceUuid/delete) | Delete a GroupingDevice link by uuid. |
| deleteGroupingLink | groupingLinkUuid | [link](https://iotery.io/docs/account-manager#tag/Links/paths/~1grouping-links~1:groupingLinkUuid/delete) | Delete a GroupingLink by uuid. |
| deleteWebhookAction | webhookActionUuid | [link](https://iotery.io/docs/account-manager#tag/Webhooks/paths/~1webhook-actions~1:webhookActionUuid/delete) | Delete a webhook action type by uuid. |
| deleteQrCode | qrCodeUuid | [link](https://iotery.io/docs/account-manager#tag/QR-Codes/paths/~1qr-codes~1:qrCodeUuid/delete) | Delete a QR code by uuid. |
| deleteIoteryTemplate | ioteryTemplateUuid | [link](https://iotery.io/docs/account-manager#tag/Iotery-Templates/paths/~1iotery-templates~1:ioteryTemplateUuid/delete) | Delete an iotery template by uuid. |

## Contributing

We welcome contributors and PRs! Let us know if you are interested.

## Testing

To test, start the `mock-server.js` in `/test` and use `mocha` to run `test/index.js`.
