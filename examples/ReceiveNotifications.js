import whatsAppClient from '../src/index.js'
import dotenv from "dotenv";

(async () => {
    dotenv.config()

    let restAPI = whatsAppClient.restAPI(({
        idInstance: process.env.ID_INSTANCE,
        apiTokenInstance: process.env.API_TOKEN_INSTANCE
    }))

    try {
        // Send WhatsApp message
        const respSendMessage = await restAPI.message.sendMessage(null, 79167266138, "hello world");

        // Receive WhatsApp message. Method waits for 20 sec and returns empty string if there were no sent messages
        const respReceiveMessage = await restAPI.webhookService.receiveMessage(); 

        if (respReceiveMessage.receiptId) {
            // Confirm WhatsApp message. Each received message must be confirmed to be able to consume next message
            const respConfirmMessage = await restAPI.webhookService.confirmMessage(respReceiveMessage.receiptId);
        }
    } catch (ex) {
        console.error(ex.toString())
    }

})();