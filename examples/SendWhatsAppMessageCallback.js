const whatsAppClient = require('@green-api/whatsapp-api-client')

// instance manager https://console.green-api.com
const idInstance = ''; // your instance id
const apiTokenInstance = ''; // your instance api token

const receiverPhoneNumber = '7xxxxxxxxxx';
const message = 'hello world';

// Send WhatsApp message using callbacks
const restAPI = whatsAppClient.restAPI(({
    idInstance,
    apiTokenInstance
}))
restAPI.message.sendMessage(`${receiverPhoneNumber}@c.us`, null, message)
    .then((data) => {
        console.log(data);
    })
    .catch(e => {
        console.error(e)
    });