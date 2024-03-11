# whatsapp-api-client library for javascript

![](https://img.shields.io/badge/license-CC%20BY--ND%204.0-green)
![](https://img.shields.io/npm/v/%40green-api%2Fwhatsapp-api-client)
![](https://img.shields.io/github/actions/workflow/status/green-api/whatsapp-api-client-js/build.yml)
![](https://img.shields.io/npm/dm/%40green-api%2Fwhatsapp-api-client)

## Support links

[![Support](https://img.shields.io/badge/support@green--api.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:support@greenapi.com)
[![Support](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/greenapi_support_eng_bot)
[![Support](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/77273122366)

## Guides & News

[![Guides](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)](https://www.youtube.com/@greenapi-en)
[![News](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/green_api)
[![News](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://whatsapp.com/channel/0029VaLj6J4LNSa2B5Jx6s3h)

- [Документация на русском языке](https://github.com/green-api/whatsapp-api-client-js/blob/master/docs/README.md).

This library helps you easily create a javascript application to connect the WhatsApp API using
service [green-api.com](https://green-api.com/en). You need to get `ID_INSTANCE`and `API_TOKEN_INSTANCE` in
the [control panel](https://console.green-api.com) in order to use this library. It's free for developers.

## API

The API corresponds with [REST API](https://green-api.com/en/docs/api/) from green-api since the library wraps own
methods as https calls to the service. Therefore, using these [docs](https://green-api.com/en/docs/) is highly
encouraged.

## Installing

Library supports both browser environment without package managers and Node/Webpack apps with package manager that can
handle `require` or `import` module expressions.
For webpack and npm based apps:

```
npm i @green-api/whatsapp-api-client
```

For vanilla html-js website modify index.html:

```html

<script src="https://unpkg.com/@green-api/whatsapp-api-client/lib/whatsapp-api-client.min.js"></script>
```

## Importing

There are several ways to import the library in a project

Using common javascript

```
const whatsAppClient = require("@green-api/whatsapp-api-client");
```

Using ES6 javascript

```
import whatsAppClient from "@green-api/whatsapp-api-client";
```

Using typescript

```
import * as whatsAppClient from "@green-api/whatsapp-api-client";
```

Using browser javascript

```
<script src="https://unpkg.com/@green-api/whatsapp-api-client/lib/whatsapp-api-client.min.js"></script>
```

## Authentication

Sending WhatsApp message like any other call to the API requires account registered
on [green-api.com](https://green-api.com/en) and authentication completed on mobile WhatsApp app. To register account
you have to proceed to the [control panel](https://console.green-api.com/). After registering you wll get own unique
pair of `ID_INSTANCE` and `API_TOKEN_INSTANCE` keys.

WhatsApp mobile app authentication may be achieved by using [control panel](https://console.green-api.com/). You need to
scan QR-code generated within the control panel.

## Examples

Please do not use 'phoneNumber' parameter when calling methods. It is deprecated. Examples below are based on 'chatId'
parameter

### Send WhatsApp message

Use common javascript

```js
const whatsAppClient = require("@green-api/whatsapp-api-client");

const restAPI = whatsAppClient.restAPI({
    idInstance: "YOUR_ID_INSTANCE",
    apiTokenInstance: "YOUR_API_TOKEN_INSTANCE",
});

restAPI.message.sendMessage("79999999999@c.us", null, "hello world").then((data) => {
    console.log(data);
});
```

or use browser js script

```html

<script src="https://unpkg.com/@green-api/whatsapp-api-client/lib/whatsapp-api-client.min.js"></script>
<script>
    const restAPI = whatsAppClient.restAPI({
        idInstance: "YOUR_ID_INSTANCE",
        apiTokenInstance: "YOUR_API_TOKEN_INSTANCE",
    });
    restAPI.message
            .sendMessage("79999999999@c.us", null, "hello world")
            .then((data) => {
                console.log(data);
            })
            .catch((reason) => {
                console.error(reason);
            });
</script>
```

Or use ES6 syntax. For Node.js app, you probably have to add in `package.json` property `"type": "module"`. Notice that
all examples below are ES6 based.

```js
import whatsAppClient from "@green-api/whatsapp-api-client";

(async () => {
    const restAPI = whatsAppClient.restAPI({
        idInstance: "YOUR_ID_INSTANCE",
        apiTokenInstance: "YOUR_API_TOKEN_INSTANCE",
    });
    const response = await restAPI.message.sendMessage(
        "79999999999@c.us",
        null,
        "hello world"
    );
})();
```

### Using credentials file for `ID_INSTANCE` and `API_TOKEN_INSTANCE` keys (Node.js only!)

You might want to store yours credentials separately from code. The library allow you to create a text file with
preferred name and location with the format:

```
API_TOKEN_INSTANCE = "MY_API_TOKEN_INSTANCE"
ID_INSTANCE = "MY_ID_INSTANCE"
```

And then pass this file as described below:

```js
const restAPI = whatsAppClient.restAPI({
    credentialsPath: "examples\\credentials",
});
```

### Receive notifications using webhook service REST API

```js
import whatsAppClient from "@green-api/whatsapp-api-client";

(async () => {
    let restAPI = whatsAppClient.restAPI({
        idInstance: "YOUR_ID_INSTANCE",
        apiTokenInstance: "YOUR_API_TOKEN_INSTANCE",
    });

    try {
        // Receive WhatsApp notifications.
        console.log("Waiting incoming notifications...");
        await restAPI.webhookService.startReceivingNotifications();
        restAPI.webhookService.onReceivingMessageText((body) => {
            console.log(body);
            restAPI.webhookService.stopReceivingNotifications();
            //console.log("Notifications is about to stop in 20 sec if no messages will be queued...")
        });
        restAPI.webhookService.onReceivingDeviceStatus((body) => {
            console.log(body);
        });
        restAPI.webhookService.onReceivingAccountStatus((body) => {
            console.log(body);
        });
    } catch (ex) {
        console.error(ex.toString());
    }
})();
```

### Send WhatsApp file

```js
import whatsAppClient from "@green-api/whatsapp-api-client";

(async () => {
    const restAPI = whatsAppClient.restAPI({
        idInstance: "YOUR_ID_INSTANCE",
        apiTokenInstance: "YOUR_API_TOKEN_INSTANCE",
    });
    const response = await restAPI.file.sendFileByUrl(
        "79999999999@c.us",
        null,
        "https://avatars.mds.yandex.net/get-pdb/477388/77f64197-87d2-42cf-9305-14f49c65f1da/s375",
        "horse.png",
        "horse"
    );
})();
```

### Send WhatsApp message and receive webhook

Webhooks are event-based callbacks invoked by green-api server as responses to client API calls. Webhooks support
Node.js and express based apps only.

```js
import whatsAppClient from "@green-api/whatsapp-api-client";
import express from "express";
import bodyParser from "body-parser";

(async () => {
    try {
        // Set http url, where webhooks are hosted.
        // Url must have public domain address.
        await restAPI.settings.setSettings({
            webhookUrl: "MY_HTTP_SERVER:3000/webhooks",
        });

        const app = express();
        app.use(bodyParser.json());
        const webHookAPI = whatsAppClient.webhookAPI(app, "/webhooks");

        // Subscribe to webhook happened when WhatsApp delivered a message
        webHookAPI.onIncomingMessageText(
            (data, idInstance, idMessage, sender, typeMessage, textMessage) => {
                console.log(`outgoingMessageStatus data ${data.toString()}`);
            }
        );

        // Run web server with public domain address
        app.listen(3000, async () => {
            console.log(`Started. App listening on port 3000!`);

            const restAPI = whatsAppClient.restAPI({
                idInstance: MY_ID_INSTANCE,
                apiTokenInstance: MY_API_TOKEN_INSTANCE,
            });
            // Send test message that triggers webhook
            const response = await restAPI.message.sendMessage(
                "79999999999@c.us",
                null,
                "hello world"
            );
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
```

There's some cool [examples too](examples).

## Deploying development environment

Any help with development and bug fixing is appreciated. In order to deploy test-ready environment please make the
steps:

1. Clone repo with `git clone`
2. Install dependencies with `npm install`
3. Install globally libraries `rollup` for bundled builds.
4. Add webhooks as new dev express via npm `npm install express --save-dev`. Don't forget to delete it before making
   pull request
5. Create .env file in root folder and add environment variables using example file [env.example](env.example)
6. Add `"type": "module"` to the package.json

## Build

Compile browser and node|webpack versions with single command:

```
npm run build
```

Publish to npm if you have access

```
npm publish
```

## Third-party libraries

- [axios](https://github.com/axios/axios) - http requests
- [express](https://www.npmjs.com/package/express) - app server for webhooks

## License

Licensed on MIT terms. For additional info have look at [LICENSE](LICENSE)
