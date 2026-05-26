import whatsAppClient from "@green-api/whatsapp-api-client";

const idInstance = "1101000001";
const apiTokenInstance = "d75b3a66374942c5b3c019c698abc2067e151558acbd412345";


(async () => {
    const restAPI = whatsAppClient.restAPI(({
        idInstance, apiTokenInstance
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
