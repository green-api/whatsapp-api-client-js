const whatsAppClient = require('@green-api/whatsapp-api-client')

// instance manager https://console.green-api.com
const idInstance = ''; // your instance id
const apiTokenInstance = ''; // your instance api token

(async () => {

    let restAPI = whatsAppClient.restAPI(({
        idInstance,
        apiTokenInstance
    }))

    try {

        // Receive WhatsApp notifications. Method waits for 20 sec and returns empty string if there were no sent messages
        console.log("Waiting incoming notifications...")
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
                console.log(`stateInstance=${webhookBody.stateInstance}`)
            } else if (webhookBody.typeWebhook === 'outgoingMessageStatus') {
                console.log('outgoingMessageStatus')
                console.log(`status=${webhookBody.status}`)
            } else if (webhookBody.typeWebhook === 'deviceInfo') {
                console.log('deviceInfo')
                console.log(`status=${webhookBody.deviceData}`)
            }
        }
    } catch (ex) {
        console.error(ex)
    }

    console.log("End")

})();