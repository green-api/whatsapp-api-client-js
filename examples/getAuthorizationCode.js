const whatsAppClient = require('@green-api/whatsapp-api-client')

// instance manager https://console.green-api.com
const idInstance = ''; // your instance id
const apiTokenInstance = ''; // your instance api token
const phoneNumber = 12345678910 // phone number to authorize

(async () => {
    const restAPI = whatsAppClient.restAPI(({
        idInstance,
        apiTokenInstance
    }))
    try {
        const response = await restAPI.instance.getAuthorizationCode(phoneNumber)
        console.log(response)
    } catch (ex) {
        console.error(ex);
    }
})();s