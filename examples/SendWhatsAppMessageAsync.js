const whatsAppClient = require('@green-api/whatsapp-api-client')

// instance manager https://console.green-api.com
const idInstance = ''; // your instance id
const apiTokenInstance = ''; // your instance api token

const receiverPhoneNumber = '7xxxxxxxxxx';
const message = 'hello world';

// Send WhatsApp message
(async () => {
    const restAPI = whatsAppClient.restAPI(({
        idInstance,
        apiTokenInstance
    }))
    try {
        const response = await restAPI.message.sendMessage(`${receiverPhoneNumber}@c.us`, null,"hello world");
        console.log(response.idMessage)
    } catch (ex) {
        console.error(ex);
    }
})();