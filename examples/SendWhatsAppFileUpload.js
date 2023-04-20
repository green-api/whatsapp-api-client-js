const whatsAppClient = require('@green-api/whatsapp-api-client')
const FormData = require('form-data')
const fs = require('fs')
const Path = require("path");

// instance manager https://console.green-api.com
const idInstance = ''; // your instance id
const apiTokenInstance = ''; // your instance api token

const receiverPhoneNumber = '7xxxxxxxxxx';
const caption = 'My file';
const filePath = Path.resolve(process.cwd(), 'hello.txt');

// Send WhatsApp file
(async () => {
    const restAPI = whatsAppClient.restAPI(({
        idInstance,
        apiTokenInstance
    }))
    const data = new FormData();
    data.append('chatId', `${receiverPhoneNumber}@c.us`);
    data.append('caption', caption);
    data.append('file', fs.createReadStream(filePath));
    const response = await restAPI.file.sendFileByUpload(data)
    console.log(`file uploaded ${response.idMessage}`)
})();