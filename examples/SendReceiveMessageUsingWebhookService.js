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
        const respSendMessage = await restAPI.message.sendMessage(null, 79167266138, "hello world");

        // method waits for 20 sec if there were no sent messages
        const respReceiveMessage = await restAPI.webhookService.receiveMessage(); 

        if (respReceiveMessage.deliveryTag) {
            // each received message must be confirmed to be able to consume next message
            const respConfirmMessage = await restAPI.webhookService.confirmMessage(respReceiveMessage.deliveryTag);
        }
    } catch (ex) {
        console.error(ex.toString())
    }

})();