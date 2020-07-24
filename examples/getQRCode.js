import whatsAppClient from '../src/index.js'
import dotenv from "dotenv";

// Send WhatsApp file
(async () => {
    dotenv.config()
    const restAPI = whatsAppClient.restAPI(({
        idInstance: process.env.ID_INSTANCE,
        apiTokenInstance: process.env.API_TOKEN_INSTANCE
    }))
    
    const response = await restAPI.instance.qr();
    let t1 = "";
})();