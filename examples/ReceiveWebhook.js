const whatsAppClient = require("@green-api/whatsapp-api-client");
const express = require("express");
const bodyParser = require("body-parser");

// Receive webhook
(async () => {
    try {

        const app = express();
        const webHookAPI = whatsAppClient.webhookAPI(app, '/')
        app.use(bodyParser.json());

        webHookAPI.onIncomingMessageText((data, idInstance, idMessage, sender, typeMessage, textMessage) => {
            console.log(`Incoming Notification data ${JSON.stringify(data)}`)
        });

        app.listen(80, async () => {
            console.log(`Started. App listening on port 80!`)
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();