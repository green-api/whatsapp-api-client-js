import whatsAppClient from '@green-api/whatsapp-api-client';

const chatId = '79876543210@c.us'; // receiver chat id

// Show "typing..." indicator for 3 seconds, then send a message
(async () => {
    const restAPI = whatsAppClient.restAPI({ credentialsPath: './credentials' });

    await restAPI.instance.sendTyping(chatId, 3000);
    const response = await restAPI.message.sendMessage(chatId, null, 'Hello! I was typing...');
    console.log(response.idMessage);
})();
