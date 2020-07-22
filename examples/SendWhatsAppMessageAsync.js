import whatsAppClient from '../src/index.js'
import dotenv from "dotenv";

// Send WhatsApp message
(async () => {
    dotenv.config()
    const restAPI = whatsAppClient.restAPI(({
        idInstance: process.env.ID_INSTANCE,
        apiTokenInstance: process.env.API_TOKEN_INSTANCE
    }))
    try {
        const response = await restAPI.message.sendMessage(null, 79167266138, "hello world");
    } catch (ex) {
        console.log(ex.toString());
    }
})();