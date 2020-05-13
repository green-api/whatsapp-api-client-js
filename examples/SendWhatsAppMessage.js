import whatsAppClient from '../src/index.js'
import dotenv from "dotenv";

// Send WhatsApp message
(async () => {
    dotenv.config()
    const restAPI = whatsAppClient.restAPI(({
        idInstance: process.env.ID_INSTANCE,
        apiTokenInstance: process.env.API_TOKEN_INSTANCE
    }))
    const response = restAPI.message.sendMessage(null, 79999999999, "hello world");
})();

// Send WhatsApp message using callbacks
dotenv.config()
const restAPI = whatsAppClient.restAPI(({
    idInstance: process.env.ID_INSTANCE,
    apiTokenInstance: process.env.API_TOKEN_INSTANCE
}))
restAPI.message.sendMessage(null, 79999999999, "hello world")
.then((data) => {
    console.log(data);
});