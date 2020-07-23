import whatsAppClient from '../src/index.js'
import dotenv from "dotenv";

(async () => {
    dotenv.config()

    let restAPI = whatsAppClient.restAPI(({
        idInstance: process.env.ID_INSTANCE,
        apiTokenInstance: process.env.API_TOKEN_INSTANCE
    }))

    try {

        // Receive WhatsApp notifications. Method waits for 20 sec and returns empty string if there were no sent messages
        console.log( "Waiting incoming notifications...")
        let response
        while (response = await restAPI.webhookService.receiveNotification()) {
            let webhookBody = response.body;
            if (webhookBody.typeWebhook === 'incomingMessageReceived') {
                console.log('incomingMessageReceived')
                console.log(webhookBody.messageData.textMessageData.textMessage)
                // Confirm WhatsApp message. Each received message must be confirmed to be able to consume next message
                await restAPI.webhookService.deleteNotification(response.receiptId);
            } else if (webhookBody.typeWebhook === 'stateInstanceChanged') { 
                console.log('stateInstanceChanged')
                console.log(webhookBody.instanceData.wid)
            } else if (webhookBody.typeWebhook === 'outgoingMessageStatus') { 
                console.log('outgoingMessageStatus')
            } else if (webhookBody.typeWebhook === 'deviceInfo') { 
                console.log('deviceInfo')
            }
        }
    } catch (ex) {
        console.error(ex.toString())
    }

    console.log( "End")

})();