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

This SDK simply wraps the [REST API](https://somelink_to_swagger_docs), so more information and specifics can be found there. Since the API is a wrapper around the REST API, the syntax is standard for each of the Create, Read, Update, and Delete operations on iotery.io resources. All methods return a `Promise`.

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

|           `methodName`           |         `input`          |                                link                                |                                  `description`                                  |
| :------------------------------: | :----------------------: | :----------------------------------------------------------------: | :-----------------------------------------------------------------------------: |
|       createAccountManager       |                          |       [link](https://iotery.io/v1/docs#createAccountManager)       |                           Create an account manager.                            |
|          createConsumer          |                          |          [link](https://iotery.io/v1/docs#createConsumer)          |                               Create a consumer.                                |
|       linkConsumerToDevice       |       consumerUuid       |       [link](https://iotery.io/v1/docs#linkConsumerToDevice)       |                          Link a consumer to a device.                           |
|      linkConsumerToNetwork       |       consumerUuid       |      [link](https://iotery.io/v1/docs#linkConsumerToNetwork)       |                          Link a consumer to a network.                          |
|         createDeviceType         |                          |         [link](https://iotery.io/v1/docs#createDeviceType)         |                              Create a device type.                              |
|        createSettingType         |                          |        [link](https://iotery.io/v1/docs#createSettingType)         |                             Create a setting type.                              |
|       createDefaultSetting       |                          |       [link](https://iotery.io/v1/docs#createDefaultSetting)       |                            Create a default setting.                            |
|          createDataType          |                          |          [link](https://iotery.io/v1/docs#createDataType)          |                               Create a data type.                               |
|           createDevice           |                          |           [link](https://iotery.io/v1/docs#createDevice)           |                                Create a device.                                 |
|  createBatchedCommandInstances   |                          |  [link](https://iotery.io/v1/docs#createBatchedCommandInstances)   |                   Create a set of batched command instances.                    |
|   createDeviceCommandInstance    |        deviceUuid        |   [link](https://iotery.io/v1/docs#createDeviceCommandInstance)    |                     Create a command instance for a device.                     |
| createDeviceNotificationInstance |        deviceUuid        | [link](https://iotery.io/v1/docs#createDeviceNotificationInstance) |                  Create a notification instance for a device.                   |
|       createDeviceSetting        |        deviceUuid        |       [link](https://iotery.io/v1/docs#createDeviceSetting)        |                         Create a setting for a device.                          |
|       createFirmwareRecord       |                          |       [link](https://iotery.io/v1/docs#createFirmwareRecord)       |                            Create a firmware record.                            |
|        createSeverityType        |                          |        [link](https://iotery.io/v1/docs#createSeverityType)        |                             Create a severity type.                             |
|        createNotification        |                          |        [link](https://iotery.io/v1/docs#createNotification)        |                             Create a notification.                              |
|        createPriorityType        |                          |        [link](https://iotery.io/v1/docs#createPriorityType)        |                             Create a priority type.                             |
|        createCommandType         |                          |        [link](https://iotery.io/v1/docs#createCommandType)         |                             Create a command type.                              |
|        createCommandField        |                          |        [link](https://iotery.io/v1/docs#createCommandField)        |                             Create a command field.                             |
|         createEventType          |                          |         [link](https://iotery.io/v1/docs#createEventType)          |                              Create an event type.                              |
|           createEvent            |                          |           [link](https://iotery.io/v1/docs#createEvent)            |                                Create an event.                                 |
|        createGroupingType        |                          |        [link](https://iotery.io/v1/docs#createGroupingType)        |                             Create a grouping type.                             |
|            createTeam            |                          |            [link](https://iotery.io/v1/docs#createTeam)            |                                 Create a team.                                  |
|     linkAccountManagerToTeam     |         userUuid         |     [link](https://iotery.io/v1/docs#linkAccountManagerToTeam)     |                         Link account manager to a team.                         |
|  createGroupingBatchedCommands   |       groupingUuid       |  [link](https://iotery.io/v1/docs#createGroupingBatchedCommands)   | Create a set of batched commands for a grouping and all child grouping devices. |
|       moveDeviceToGrouping       |       groupingUuid       |       [link](https://iotery.io/v1/docs#moveDeviceToGrouping)       |                          Move a device to a grouping.                           |
|          createNetwork           |                          |          [link](https://iotery.io/v1/docs#createNetwork)           |                                Create a network.                                |
|   createNetworkBatchedCommands   |       networkUuid        |   [link](https://iotery.io/v1/docs#createNetworkBatchedCommands)   |            Create a set of batched commands for a network's devices.            |
|          createGrouping          |       networkUuid        |          [link](https://iotery.io/v1/docs#createGrouping)          |                           Create a network grouping.                            |
|         addChildGrouping         | networkUuid,groupingUuid |         [link](https://iotery.io/v1/docs#addChildGrouping)         |                              Add a child grouping.                              |
|      createNetworkLocation       |       networkUuid        |      [link](https://iotery.io/v1/docs#createNetworkLocation)       |                           Create a network location.                            |
|          createSchedule          |       networkUuid        |          [link](https://iotery.io/v1/docs#createSchedule)          |                               Create a schedule.                                |
|      executeNetworkSchedule      | networkUuid,scheduleUuid |      [link](https://iotery.io/v1/docs#executeNetworkSchedule)      |                               Execute a schedule.                               |
|        deprovisionNetwork        |       networkUuid        |        [link](https://iotery.io/v1/docs#deprovisionNetwork)        |                             Deprovision a network.                              |
|         provisionNetwork         |                          |         [link](https://iotery.io/v1/docs#provisionNetwork)         |                              Provision a network.                               |
|         provisionDevice          |  networkUuid,deviceUuid  |         [link](https://iotery.io/v1/docs#provisionDevice)          |                               Provision a device.                               |
|        deprovisionDevice         |  networkUuid,deviceUuid  |        [link](https://iotery.io/v1/docs#deprovisionDevice)         |                              Deprovision a device.                              |
|         executeSchedule          |       scheduleUuid       |         [link](https://iotery.io/v1/docs#executeSchedule)          |                               Execute a schedule.                               |
|       createGroupingDevice       |                          |       [link](https://iotery.io/v1/docs#createGroupingDevice)       |                          Create a GroupingDevice link.                          |
|        createGroupingLink        |                          |        [link](https://iotery.io/v1/docs#createGroupingLink)        |                             Create a GroupingLink.                              |
|       createWebhookAction        |                          |       [link](https://iotery.io/v1/docs#createWebhookAction)        |                            Create a webhook action.                             |

### Reading Resources

The generalized syntax for reading resources looks like:

```js
methodName({ input: "parameters" }, { query: { param: "value" } });
```

For example, to get a device, the javascript would look like

```js
getDeviceByUuid({ deviceUuid: "a-valid-device-uuid" }, { query: { limit: 1 } });
```

where `getDeviceByUuid` maps to `methodName`, `deviceUuid` maps to `input`, and `limit` maps to `param` in the generalized form given above.

The available resource reading methods are

|           `methodName`            |             `input`             |                                link                                 |                   `description`                    |
| :-------------------------------: | :-----------------------------: | :-----------------------------------------------------------------: | :------------------------------------------------: |
|       getHealthCheckResult        |                                 |       [link](https://iotery.io/v1/docs#getHealthCheckResult)        |      Get the result of a server health check.      |
|         getAccountManager         |            userUuid             |         [link](https://iotery.io/v1/docs#getAccountManager)         |          Get an account manager by uuid.           |
|          getConsumerList          |                                 |          [link](https://iotery.io/v1/docs#getConsumerList)          |         Get a list of available consumers.         |
|            getConsumer            |          consumerUuid           |            [link](https://iotery.io/v1/docs#getConsumer)            |              Get a consumer by uuid.               |
|         getDeviceTypeList         |                                 |         [link](https://iotery.io/v1/docs#getDeviceTypeList)         |       Get a list of available device types.        |
|           getDeviceType           |         deviceTypeUuid          |           [link](https://iotery.io/v1/docs#getDeviceType)           |             Get a device type by uuid.             |
|        getSettingTypeList         |                                 |        [link](https://iotery.io/v1/docs#getSettingTypeList)         |       Get a list of available setting types.       |
|          getSettingType           |         settingTypeUuid         |          [link](https://iotery.io/v1/docs#getSettingType)           |            Get a setting type by uuid.             |
|       getDefaultSettingList       |                                 |       [link](https://iotery.io/v1/docs#getDefaultSettingList)       |          Get a list of default settings.           |
|         getDefaultSetting         |       defaultSettingUuid        |         [link](https://iotery.io/v1/docs#getDefaultSetting)         |           Get a default setting by uuid.           |
|          getDataTypeList          |                                 |          [link](https://iotery.io/v1/docs#getDataTypeList)          |        Get a list of available data types.         |
|            getDataType            |          dataTypeUuid           |            [link](https://iotery.io/v1/docs#getDataType)            |              Get a data type by uuid.              |
|           getDeviceList           |                                 |           [link](https://iotery.io/v1/docs#getDeviceList)           |               Get a list of devices.               |
| getUnexecutedCommandInstanceList  |                                 | [link](https://iotery.io/v1/docs#getUnexecutedCommandInstanceList)  |       Get all unexecuted command instances.        |
|             getDevice             |           deviceUuid            |             [link](https://iotery.io/v1/docs#getDevice)             |               Get a device by uuid.                |
|         getDeviceDataList         |           deviceUuid            |         [link](https://iotery.io/v1/docs#getDeviceDataList)         |          Get a list of data for a device.          |
|        getDeviceEventList         |           deviceUuid            |        [link](https://iotery.io/v1/docs#getDeviceEventList)         |         Get a list of events for a device.         |
| getDeviceNotificationInstanceList |           deviceUuid            | [link](https://iotery.io/v1/docs#getDeviceNotificationInstanceList) | Get a list of notification instances for a device. |
|       getDeviceSettingList        |           deviceUuid            |       [link](https://iotery.io/v1/docs#getDeviceSettingList)        |        Get a list of settings for a device.        |
|       getFirmwareRecordList       |                                 |       [link](https://iotery.io/v1/docs#getFirmwareRecordList)       |          Get a list of firmware records.           |
|         getFirmwareRecord         |          firmwareUuid           |         [link](https://iotery.io/v1/docs#getFirmwareRecord)         |           Get a firmware record by uuid.           |
|        getSeverityTypeList        |                                 |        [link](https://iotery.io/v1/docs#getSeverityTypeList)        |      Get a list of available severity types.       |
|          getSeverityType          |        severityTypeUuid         |          [link](https://iotery.io/v1/docs#getSeverityType)          |          Delete a severity type by uuid.           |
|        getNotificationList        |                                 |        [link](https://iotery.io/v1/docs#getNotificationList)        |       Get a list of available notifications.       |
|          getNotification          |        notificationUuid         |          [link](https://iotery.io/v1/docs#getNotification)          |            Get a notification by uuid.             |
|        getPriorityTypeList        |                                 |        [link](https://iotery.io/v1/docs#getPriorityTypeList)        |      Get a list of available priority types.       |
|          getPriorityType          |        priorityTypeUuid         |          [link](https://iotery.io/v1/docs#getPriorityType)          |            Get a priority type by uuid.            |
|        getCommandTypeList         |                                 |        [link](https://iotery.io/v1/docs#getCommandTypeList)         |       Get a list of available command types.       |
|          getCommandType           |         commandTypeUuid         |          [link](https://iotery.io/v1/docs#getCommandType)           |            Get a command type by uuid.             |
|        getCommandFieldList        |                                 |        [link](https://iotery.io/v1/docs#getCommandFieldList)        |      Get a list of available command fields.       |
|          getCommandField          |        commandFieldUuid         |          [link](https://iotery.io/v1/docs#getCommandField)          |            Get a command field by uuid.            |
|         getEventTypeList          |                                 |         [link](https://iotery.io/v1/docs#getEventTypeList)          |        Get a list of available event types.        |
|           getEventType            |          eventTypeUuid          |           [link](https://iotery.io/v1/docs#getEventType)            |             Get an event type by uuid.             |
|           getEventList            |                                 |           [link](https://iotery.io/v1/docs#getEventList)            |               Get a list of events.                |
|             getEvent              |            eventUuid            |             [link](https://iotery.io/v1/docs#getEvent)              |               Get an event by uuid.                |
|        getGroupingTypeList        |                                 |        [link](https://iotery.io/v1/docs#getGroupingTypeList)        |      Get a list of available grouping types.       |
|          getGroupingType          |        groupingTypeUuid         |          [link](https://iotery.io/v1/docs#getGroupingType)          |            Get a grouping type by uuid.            |
|            getTeamList            |                                 |            [link](https://iotery.io/v1/docs#getTeamList)            |           Get a list of available teams.           |
|              getTeam              |            teamUuid             |              [link](https://iotery.io/v1/docs#getTeam)              |                Get a team by uuid.                 |
|            getGrouping            |          groupingUuid           |            [link](https://iotery.io/v1/docs#getGrouping)            |              Get a grouping by uuid.               |
|     getDeviceListForGrouping      |          groupingUuid           |     [link](https://iotery.io/v1/docs#getDeviceListForGrouping)      |       Get a list of devices for a grouping.        |
|          getNetworkList           |                                 |          [link](https://iotery.io/v1/docs#getNetworkList)           |              Get a list of networks.               |
|            getNetwork             |           networkUuid           |            [link](https://iotery.io/v1/docs#getNetwork)             |               Get a network by uuid.               |
|       getNetworkDeviceList        |           networkUuid           |       [link](https://iotery.io/v1/docs#getNetworkDeviceList)        |              Get a network's devices.              |
|      getNetworkGroupingList       |           networkUuid           |      [link](https://iotery.io/v1/docs#getNetworkGroupingList)       |             Get a network's groupings.             |
|        getNetworkGrouping         |    networkUuid,groupingUuid     |        [link](https://iotery.io/v1/docs#getNetworkGrouping)         |         Get a network's grouping by uuid.          |
|       getChildGroupingList        |    networkUuid,groupingUuid     |       [link](https://iotery.io/v1/docs#getChildGroupingList)        |   Get a list of child groupings for a grouping.    |
|      getNetworkLocationList       |           networkUuid           |      [link](https://iotery.io/v1/docs#getNetworkLocationList)       |             Get a network's locations.             |
|        getNetworkLocation         | networkUuid,networkLocationUuid |        [link](https://iotery.io/v1/docs#getNetworkLocation)         |          Get a network location by uuid.           |
|      getNetworkScheduleList       |           networkUuid           |      [link](https://iotery.io/v1/docs#getNetworkScheduleList)       |        Get a list of a network's schedules.        |
|        getNetworkSchedule         |    networkUuid,scheduleUuid     |        [link](https://iotery.io/v1/docs#getNetworkSchedule)         |              Get a schedule by uuid.               |
|            getSchedule            |          scheduleUuid           |            [link](https://iotery.io/v1/docs#getSchedule)            |              Get a schedule by uuid.               |
|       getGroupingDeviceList       |                                 |       [link](https://iotery.io/v1/docs#getGroupingDeviceList)       |        Get a list of GroupingDevice links.         |
|         getGroupingDevice         |       groupingDeviceUuid        |         [link](https://iotery.io/v1/docs#getGroupingDevice)         |         Get a GroupingDevice link by uuid.         |
|        getGroupingLinkList        |                                 |        [link](https://iotery.io/v1/docs#getGroupingLinkList)        |            Get a list of GroupingLinks.            |
|          getGroupingLink          |        groupingLinkUuid         |          [link](https://iotery.io/v1/docs#getGroupingLink)          |            Get a GroupingLink by uuid.             |
|       getWebhookActionList        |                                 |       [link](https://iotery.io/v1/docs#getWebhookActionList)        |           Get a list of webhook actions.           |
|         getWebhookAction          |        webhookActionUuid        |         [link](https://iotery.io/v1/docs#getWebhookAction)          |           Get a webhook action by uuid.            |

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

|         `methodName`         |             `input`             |                              link                              |             `description`             |
| :--------------------------: | :-----------------------------: | :------------------------------------------------------------: | :-----------------------------------: |
|     updateAccountManager     |            userUuid             |     [link](https://iotery.io/v1/docs#updateAccountManager)     |  Update an account manager by uuid.   |
|        updateConsumer        |          consumerUuid           |        [link](https://iotery.io/v1/docs#updateConsumer)        |      Update a consumer by uuid.       |
|       updateDeviceType       |         deviceTypeUuid          |       [link](https://iotery.io/v1/docs#updateDeviceType)       |     Update a device type by uuid.     |
|      updateSettingType       |         settingTypeUuid         |      [link](https://iotery.io/v1/docs#updateSettingType)       |    Update a setting type by uuid.     |
|     updateDefaultSetting     |       defaultSettingUuid        |     [link](https://iotery.io/v1/docs#updateDefaultSetting)     |   Update a default setting by uuid.   |
|        updateDataType        |          dataTypeUuid           |        [link](https://iotery.io/v1/docs#updateDataType)        |      Update a data type by uuid.      |
|         updateDevice         |           deviceUuid            |         [link](https://iotery.io/v1/docs#updateDevice)         |       Update a device by uuid.        |
|     updateFirmwareRecord     |          firmwareUuid           |     [link](https://iotery.io/v1/docs#updateFirmwareRecord)     |   Update a firmware record by uuid.   |
|      updateSeverityType      |        severityTypeUuid         |      [link](https://iotery.io/v1/docs#updateSeverityType)      |    Update a severity type by uuid.    |
|      updateNotification      |        notificationUuid         |      [link](https://iotery.io/v1/docs#updateNotification)      |    Update a notification by uuid.     |
|      updatePriorityType      |        priorityTypeUuid         |      [link](https://iotery.io/v1/docs#updatePriorityType)      |    Update a priority type by uuid.    |
|      updateCommandType       |         commandTypeUuid         |      [link](https://iotery.io/v1/docs#updateCommandType)       |    Update a command type by uuid.     |
|      updateCommandField      |        commandFieldUuid         |      [link](https://iotery.io/v1/docs#updateCommandField)      |    Update a command field by uuid.    |
|       updateEventType        |          eventTypeUuid          |       [link](https://iotery.io/v1/docs#updateEventType)        |     Update an event type by uuid.     |
|         updateEvent          |            eventUuid            |         [link](https://iotery.io/v1/docs#updateEvent)          |       Update an event by uuid.        |
|      updateGroupingType      |        groupingTypeUuid         |      [link](https://iotery.io/v1/docs#updateGroupingType)      |    Update a grouping type by uuid.    |
|          updateTeam          |            teamUuid             |          [link](https://iotery.io/v1/docs#updateTeam)          |        Update a team by uuid.         |
|        updateGrouping        |          groupingUuid           |        [link](https://iotery.io/v1/docs#updateGrouping)        |          Update a grouping.           |
|    updateNetworkLocation     |       networkLocationUuid       |    [link](https://iotery.io/v1/docs#updateNetworkLocation)     |  Update a network location by uuid.   |
|        updateNetwork         |           networkUuid           |        [link](https://iotery.io/v1/docs#updateNetwork)         |       Update a network by uuid.       |
|    updateNetworkGrouping     |    networkUuid,groupingUuid     |    [link](https://iotery.io/v1/docs#updateNetworkGrouping)     |      Update a network grouping.       |
| updateNetworkNetworkLocation | networkUuid,networkLocationUuid | [link](https://iotery.io/v1/docs#updateNetworkNetworkLocation) |      Update a network location.       |
|    updateNetworkSchedule     |    networkUuid,scheduleUuid     |    [link](https://iotery.io/v1/docs#updateNetworkSchedule)     |          Update a schedule.           |
|        updateSchedule        |          scheduleUuid           |        [link](https://iotery.io/v1/docs#updateSchedule)        |          Update a schedule.           |
|     updateGroupingDevice     |       groupingDeviceUuid        |     [link](https://iotery.io/v1/docs#updateGroupingDevice)     | Update a GroupingDevice link by uuid. |
|      updateGroupingLink      |        groupingLinkUuid         |      [link](https://iotery.io/v1/docs#updateGroupingLink)      |    Update a GroupingLink by uuid.     |
|     updateWebhookAction      |        webhookActionUuid        |     [link](https://iotery.io/v1/docs#updateWebhookAction)      |   Update a webhook action by uuid.    |

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

|         `methodName`         |               `input`               |                              link                              |             `description`             |
| :--------------------------: | :---------------------------------: | :------------------------------------------------------------: | :-----------------------------------: |
|     deleteAccountManager     |              userUuid               |     [link](https://iotery.io/v1/docs#deleteAccountManager)     |  Delete an account manager by uuid.   |
|        deleteConsumer        |            consumerUuid             |        [link](https://iotery.io/v1/docs#deleteConsumer)        |      Delete a consumer by uuid.       |
|   unlinkConsumerFromDevice   |       consumerUuid,deviceUuid       |   [link](https://iotery.io/v1/docs#unlinkConsumerFromDevice)   |   Unlink a consumer from a device.    |
|  unlinkConsumerFromNetwork   |      consumerUuid,networkUuid       |  [link](https://iotery.io/v1/docs#unlinkConsumerFromNetwork)   |   Unlink a consumer from a network.   |
|       deleteDeviceType       |           deviceTypeUuid            |       [link](https://iotery.io/v1/docs#deleteDeviceType)       |     Delete a device type by uuid.     |
|      deleteSettingType       |           settingTypeUuid           |      [link](https://iotery.io/v1/docs#deleteSettingType)       |    Delete a setting type by uuid.     |
|     deleteDefaultSetting     |         defaultSettingUuid          |     [link](https://iotery.io/v1/docs#deleteDefaultSetting)     |   Delete a default setting by uuid.   |
|        deleteDataType        |            dataTypeUuid             |        [link](https://iotery.io/v1/docs#deleteDataType)        |      Delete a data type by uuid.      |
|         deleteDevice         |             deviceUuid              |         [link](https://iotery.io/v1/docs#deleteDevice)         |       Delete a device by uuid.        |
|     deleteFirmwareRecord     |            firmwareUuid             |     [link](https://iotery.io/v1/docs#deleteFirmwareRecord)     |   Delete a firmware record by uuid.   |
|      deleteSeverityType      |          severityTypeUuid           |      [link](https://iotery.io/v1/docs#deleteSeverityType)      |    Delete a severity type by uuid.    |
|      deleteNotification      |          notificationUuid           |      [link](https://iotery.io/v1/docs#deleteNotification)      |    Delete a notification by uuid.     |
|      deletePriorityType      |          priorityTypeUuid           |      [link](https://iotery.io/v1/docs#deletePriorityType)      |    Delete a priority type by uuid.    |
|      deleteCommandType       |           commandTypeUuid           |      [link](https://iotery.io/v1/docs#deleteCommandType)       |    Delete a command type by uuid.     |
|      deleteCommandField      |          commandFieldUuid           |      [link](https://iotery.io/v1/docs#deleteCommandField)      |    Delete a command field by uuid.    |
|       deleteEventType        |            eventTypeUuid            |       [link](https://iotery.io/v1/docs#deleteEventType)        |     Delete an event type by uuid.     |
|         deleteEvent          |              eventUuid              |         [link](https://iotery.io/v1/docs#deleteEvent)          |       Delete an event by uuid.        |
|      deleteGroupingType      |          groupingTypeUuid           |      [link](https://iotery.io/v1/docs#deleteGroupingType)      |    Delete a grouping type by uuid.    |
|          deleteTeam          |              teamUuid               |          [link](https://iotery.io/v1/docs#deleteTeam)          |        Delete a team by uuid.         |
| unlinkAccountManagerFromTeam |              userUuid               | [link](https://iotery.io/v1/docs#unlinkAccountManagerFromTeam) |  Unlink account manager from a team.  |
|        deleteGrouping        |            groupingUuid             |        [link](https://iotery.io/v1/docs#deleteGrouping)        |      Delete a grouping by uuid.       |
|        deleteNetwork         |             networkUuid             |        [link](https://iotery.io/v1/docs#deleteNetwork)         |       Delete a network by uuid.       |
|    deleteNetworkGrouping     |      networkUuid,groupingUuid       |    [link](https://iotery.io/v1/docs#deleteNetworkGrouping)     | Delete a network's grouping by uuid.  |
|   removeDeviceFromGrouping   | networkUuid,groupingUuid,deviceUuid |   [link](https://iotery.io/v1/docs#removeDeviceFromGrouping)   |    remove a device from a grouping    |
|    deleteNetworkLocation     |   networkUuid,networkLocationUuid   |    [link](https://iotery.io/v1/docs#deleteNetworkLocation)     |  Delete a network location by uuid.   |
|    deleteNetworkSchedule     |      networkUuid,scheduleUuid       |    [link](https://iotery.io/v1/docs#deleteNetworkSchedule)     |      Delete a schedule by uuid.       |
|        deleteSchedule        |            scheduleUuid             |        [link](https://iotery.io/v1/docs#deleteSchedule)        |      Delete a schedule by uuid.       |
|     deleteGroupingDevice     |         groupingDeviceUuid          |     [link](https://iotery.io/v1/docs#deleteGroupingDevice)     | Delete a GroupingDevice link by uuid. |
|      deleteGroupingLink      |          groupingLinkUuid           |      [link](https://iotery.io/v1/docs#deleteGroupingLink)      |    Delete a GroupingLink by uuid.     |
|     deleteWebhookAction      |          webhookActionUuid          |     [link](https://iotery.io/v1/docs#deleteWebhookAction)      | Delete a webhook action type by uuid. |

## Contributing

We welcome contributors and PRs! Let us know if you are interested.

## Testing

To test, start the `mock-server.js` in `/test` and use `mocha` to run `test/index.js`.
