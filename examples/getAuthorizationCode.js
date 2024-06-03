const whatsAppClient = require('@green-api/whatsapp-api-client')

// instance manager https://console.green-api.com
const idInstance = '1101000001'; // your instance id
const apiTokenInstance = 'd75b3a66374942c5b3c019c698abc2067e151558acbd412345'; // your instance api token
const phoneNumber = 12345678910; // phone number to authorize

(async () => {
    const restAPI = whatsAppClient.restAPI(({
        idInstance, apiTokenInstance
    }))

    try {
        const getAuthorizationCodeResponse = await restAPI.instance.getAuthorizationCode(phoneNumber)

        console.log(getAuthorizationCodeResponse)
    } catch (ex) {
        console.error(ex);
    }
})();
