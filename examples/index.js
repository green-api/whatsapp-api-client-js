import whatsAppClient from '../src/index.js'
import dotenv from "dotenv";
import express from "express";

// Send Whatsapp message
(async () => {
    dotenv.config()
    const restAPI = whatsAppClient.restAPI(({
        idInstance: process.env.ID_INSTANCE,
        apiTokenInstance: process.env.API_TOKEN_INSTANCE
    }))
    const response = await restAPI.message.sendMessage(null, 79999999999, "hello world");
})();

// Send Whatsapp file
(async () => {
    dotenv.config()
    const restAPI = whatsAppClient.restAPI(({
        idInstance: process.env.ID_INSTANCE,
        apiTokenInstance: process.env.API_TOKEN_INSTANCE
    }))
    const response = await restAPI.file.sendFileByUrl(null, 79999999999, 'https://avatars.mds.yandex.net/get-pdb/477388/77f64197-87d2-42cf-9305-14f49c65f1da/s375', 'horse.png', 'horse');
})();

// Send Whatsapp file using callbacks
dotenv.config()
const restAPI = whatsAppClient.restAPI(({
    idInstance: process.env.ID_INSTANCE,
    apiTokenInstance: process.env.API_TOKEN_INSTANCE
}))
restAPI.file.sendFileByUrl(null, 79999999999, 'https://avatars.mds.yandex.net/get-pdb/477388/77f64197-87d2-42cf-9305-14f49c65f1da/s375', 'horse.png', 'horse')
.then((data) => {
    console.log(data);
}) ;

// Receive webhook
(async () => {
    try {
        dotenv.config()
        const app = express();
        const webHookAPI = whatsAppClient.webhookAPI(app)
        webHookAPI.createIncomingMessageReceivedHook((data) => {
            console.log(`webhook data ${data}`)
        })
        app.listen(3000, () => console.log(`Started. App listening on port 3000!`));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();

