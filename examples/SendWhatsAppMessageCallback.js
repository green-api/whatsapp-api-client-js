import whatsAppClient from '@green-api/whatsapp-api-client'

// Send WhatsApp message using callbacks
const restAPI = whatsAppClient.restAPI(({
    idInstance: 'kghk',
    apiTokenInstance: 'rwererwq'
}))
restAPI.message.sendMessage(null, 79999999999, "hello world")
.then((data) => {
    console.log(data);
});