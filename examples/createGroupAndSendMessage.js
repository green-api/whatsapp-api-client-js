const whatsAppClient = require('@green-api/whatsapp-api-client')

const idInstance = "";
const apiTokenInstance = "";


(async () => {
    const restAPI = whatsAppClient.restAPI(({
        idInstance,
        apiTokenInstance
    }))
    try {
        const createGroupResponse = await restAPI.group.createGroup("Group Name", ["11001234567@c.us"], null)

        console.log(createGroupResponse)

        try {
            const sendMessageResponse = await restAPI.message.sendMessage(createGroupResponse.chatId, null, "Message text")

            console.log(sendMessageResponse)
        } catch (error) {
            console.error(error)
        }
    } catch (error) {
        console.error(error)
    }
})()
