const whatsAppClient = require('@green-api/whatsapp-api-client')

// instance manager https://console.green-api.com
const idInstance = ''; // your instance id
const apiTokenInstance = ''; // your instance api token

// Get qr code data
;(async () => {
    const restAPI = whatsAppClient.restAPI(({
        idInstance,
        apiTokenInstance
    }))
    const response = await restAPI.instance.qr();
    console.log(response)
})();