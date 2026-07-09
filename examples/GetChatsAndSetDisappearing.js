import whatsAppClient from '@green-api/whatsapp-api-client';

console.log('Script started');

const chatId = '3453543454@c.us'; // chat id to enable disappearing messages for

(async () => {
    console.log('Inside async IIFE');
    const restAPI = whatsAppClient.restAPI({ credentialsPath: './credentials' });
    console.log('RestAPI created, idInstance:', restAPI.params.idInstance);

    // Get list of chats
    const chats = await restAPI.instance.getChats(10);
    console.log(`Found ${chats.length} chats`);
    chats.forEach(chat => console.log(`  ${chat.type} | ${chat.id} | ${chat.name}`));

    // Enable 7-day disappearing messages for a specific chat
    // ephemeralExpiration: 0 (off), 86400 (1 day), 604800 (7 days), 7776000 (90 days)
    const result = await restAPI.instance.setDisappearingChat(chatId, 604800);
    console.log(`setDisappearingChat: disappearing=${result.disappearingMessagesInChat}, expiration=${result.ephemeralExpiration}s`);
})().catch(err => {
    console.error('Error:', err.message || err);
    if (err.response) {
        console.error('Status:', err.response.status, JSON.stringify(err.response.data));
    }
    process.exit(1);
});
