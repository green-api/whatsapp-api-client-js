import whatsAppClient from '@green-api/whatsapp-api-client'

// Send WhatsApp file
(async () => {
    const restAPI = whatsAppClient.restAPI(({
        idInstance: process.env.ID_INSTANCE,
        apiTokenInstance: process.env.API_TOKEN_INSTANCE
    }))
    const response = await restAPI.file.sendFileByUrl(null, 79999999999, 'https://avatars.mds.yandex.net/get-pdb/477388/77f64197-87d2-42cf-9305-14f49c65f1da/s375', 'horse.png', 'horse');
})();