const whatsAppClient = require("@green-api/whatsapp-api-client");

const idInstance = "1101000001";
const apiTokenInstance = "d75b3a66374942c5b3c019c698abc2067e151558acbd412345";

const filePath = "example.png";

(async () => {
    const restAPI = whatsAppClient.restAPI(({
        idInstance, apiTokenInstance
    }))

    try {
        const uploadFileResponse = await restAPI.file.uploadFile(filePath)

        console.log(uploadFileResponse)

        try {
            const sendFileByURLResponse = await restAPI.file.sendFileByUrl("11001234567@c.us", null, uploadFileResponse.urlFile, filePath)

            console.log(sendFileByURLResponse)
        } catch (error) {
            console.error(error)
        }
    } catch (error) {
        console.error(error)
    }
})()
