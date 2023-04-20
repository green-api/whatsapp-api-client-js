const whatsAppClient = require('@green-api/whatsapp-api-client')
const express = require('express')

// instance manager https://console.green-api.com
const idInstance = ''; // your instance id
const apiTokenInstance = ''; // your instance api token

const yourScriptPublicUrl = 'http://your.site/wa-webhooks';
const port = 3000;

// Receive webhook
(async () => {
    try {

        const restAPI = whatsAppClient.restAPI(({
            idInstance,
            apiTokenInstance
        }));

        await restAPI.settings.setSettings({
            webhookUrl: yourScriptPublicUrl
        });

        const app = express();
        app.use(express.json());

        const webHookAPI = whatsAppClient.webhookAPI(app, new URL(yourScriptPublicUrl).pathname)

        webHookAPI.onIncomingMessageText((data, idInstance, idMessage, sender, typeMessage, textMessage) => {
            console.log(`IncomingMessage data ${data.toString()}`)
        });

        app.listen(port, async () => {
            console.log(`Started. App listening on port ${port}!`)
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();