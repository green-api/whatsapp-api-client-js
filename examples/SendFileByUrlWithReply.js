import whatsAppClient from '@green-api/whatsapp-api-client';

const chatId = '79876543210@c.us'; // receiver chat id
const imageUrl = 'https://avatars.mds.yandex.net/get-pdb/477388/77f64197-87d2-42cf-9305-14f49c65f1da/s375';

// Send a file replying to a specific message, with a typing indicator before sending
(async () => {
    const restAPI = whatsAppClient.restAPI({ credentialsPath: './credentials' });

    // First send a message to get its id to quote
    const original = await restAPI.message.sendMessage(chatId, null, 'Here comes a file!');

    // Send file as a reply with audio recording indicator (2 seconds)
    const response = await restAPI.file.sendFileByUrl(
        chatId,
        null,
        imageUrl,
        'horse.png',
        'Look at this',
        original.idMessage,
        2000,
        'recording',
    );
    console.log('Sent:', response.idMessage);
})();
