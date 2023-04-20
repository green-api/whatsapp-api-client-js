const whatsAppClient = require('@green-api/whatsapp-api-client')

// instance manager https://console.green-api.com
const idInstance = ''; // your instance id
const apiTokenInstance = ''; // your instance api token

const receiverPhoneNumber = '7xxxxxxxxxx';
const imageUrl = 'https://avatars.mds.yandex.net/get-pdb/477388/77f64197-87d2-42cf-9305-14f49c65f1da/s375';
const fileName = 'horse.png';
const caption = 'horse';

// Send WhatsApp file
(async () => {
    const restAPI = whatsAppClient.restAPI(({
        idInstance,
        apiTokenInstance
    }))
    const response = await restAPI.file.sendFileByUrl(`${receiverPhoneNumber}@c.us`, null, imageUrl, fileName, caption);
    console.log(response)
})();