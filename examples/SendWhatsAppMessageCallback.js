const whatsAppClient = require('@green-api/whatsapp-api-client')
const dotenv = require("dotenv");

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