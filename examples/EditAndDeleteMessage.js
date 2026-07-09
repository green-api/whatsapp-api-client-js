import whatsAppClient from '@green-api/whatsapp-api-client';

const chatId = '5345434353@c.us'; // receiver chat id

// Send a message, edit it after 5 seconds, then delete it after another 5 seconds
(async () => {
    const restAPI = whatsAppClient.restAPI({ credentialsPath: './credentials' });

    const sent = await restAPI.message.sendMessage(chatId, null, 'Original text');
    console.log('Sent:', sent.idMessage);

    await new Promise(resolve => setTimeout(resolve, 5000));

    const edited = await restAPI.instance.editMessage(chatId, sent.idMessage, 'Edited text');
    console.log('Edited:', edited.idMessage);

    await new Promise(resolve => setTimeout(resolve, 5000));

    await restAPI.instance.deleteMessage(chatId, sent.idMessage);
    console.log('Deleted');
})().catch(err => {
    console.error('Error:', err.message || err);
    if (err.response) {
        console.error('Status:', err.response.status, JSON.stringify(err.response.data));
    }
    process.exit(1);
});
