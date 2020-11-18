import whatsAppClient from '@green-api/whatsapp-api-client'

// Send WhatsApp message
(async () => {
    const restAPI = whatsAppClient.restAPI(({
        credentialsPath: "examples\\credentials"
    }))
    try {
        const response = await restAPI.message.sendMessage("79999999999@c.us", null,"hello world");
        console.log(response.idMessage)
    } catch (ex) {
        console.log(ex.toString());
    }
})();