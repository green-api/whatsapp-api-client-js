const whatsAppClient = require("@green-api/whatsapp-api-client");
const express = require("express");

// Receive webhook
(async () => {
    try {

        const app = express();
        app.use(express.json());

        const webHookAPI = whatsAppClient.webhookAPI(app, '/')

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