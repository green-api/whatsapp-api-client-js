import whatsAppClient from '@green-api/whatsapp-api-client'
import FormData from 'form-data'
import * as fs from 'fs'

// Send WhatsApp file
(async () => {
    const restAPI = whatsAppClient.restAPI(({
        idInstance: process.env.ID_INSTANCE,
        apiTokenInstance: process.env.API_TOKEN_INSTANCE
    }))
    const data = new FormData();
    data.append('chatId', '7xxxxxxxxxx@c.us');
    data.append('caption', 'My file');
    data.append('file', fs.createReadStream('hello.txt'));
    const response = await restAPI.file.sendFileByUpload(data)
    console.log(`file uploaded ${response.idMessage}`)
})();