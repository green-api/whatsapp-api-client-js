const whatsAppClient = require('@green-api/whatsapp-api-client')

// instance manager https://console.green-api.com
const idInstance = ''; // your instance id
const apiTokenInstance = ''; // your instance api token

// Start Receiving Notifications
(async () => {
    const restAPI = whatsAppClient.restAPI(({
        idInstance,
        apiTokenInstance
    }))
    try {
        await restAPI.webhookService.startReceivingNotifications()
        restAPI.webhookService.onReceivingMessageText((body) => {
            console.log('onReceivingMessageText', body)
            restAPI.webhookService.stopReceivingNotifications();
            console.log("Notifications is about to stop in 5 sec if no messages will be queued...")
        })
        restAPI.webhookService.onReceivingDeviceStatus((body) => {
            console.log('onReceivingDeviceStatus', body)
        })
        restAPI.webhookService.onReceivingAccountStatus((body) => {
            console.log('onReceivingAccountStatus', body)
        })
    } catch (ex) {
        console.error(ex);
    }
})();
