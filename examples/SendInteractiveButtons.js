import whatsAppClient from '@green-api/whatsapp-api-client';

const chatId = '79876543210@c.us'; // receiver chat id

// Send an interactive buttons message (Beta)
(async () => {
    const restAPI = whatsAppClient.restAPI({ credentialsPath: './credentials' });

    // Buttons with different action types: url, call, copy
    const response = await restAPI.message.sendInteractiveButtons({
        chatId,
        header: 'GREEN-API',
        body: 'Choose an action:',
        footer: 'Powered by GREEN-API',
        buttons: [
            { buttonId: '1', buttonText: 'Visit site', type: 'url', url: 'https://green-api.com' },
            { buttonId: '2', buttonText: 'Call us', type: 'call', phoneNumber: '79876543210' },
            { buttonId: '3', buttonText: 'Copy code', type: 'copy', copyCode: 'PROMO2024' },
        ],
    });
    console.log('Sent:', response.idMessage);

    // Simple reply buttons
    const reply = await restAPI.message.sendInteractiveButtonsReply({
        chatId,
        body: 'Confirm your choice:',
        buttons: [
            { buttonId: 'yes', buttonText: 'Yes' },
            { buttonId: 'no', buttonText: 'No' },
        ],
    });
    console.log('Reply buttons sent:', reply.idMessage);
})();
