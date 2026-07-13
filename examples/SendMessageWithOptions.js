import whatsAppClient from '@green-api/whatsapp-api-client';

const chatId = '79876543210@c.us'; // receiver chat id

// Send a message with a custom link preview and typing indicator
(async () => {
    const restAPI = whatsAppClient.restAPI({ credentialsPath: './credentials' });

    // Large link preview with typing indicator
    const response = await restAPI.message.sendMessage(
        chatId,
        null,
        'Check out GREEN-API: https://green-api.com',
        null,
        true,
        {
            typePreview: 'large',
            typingTime: 2000,
        }
    );
    console.log('Sent:', response.idMessage);

    // Message with a custom preview (overrides auto-fetched preview)
    const custom = await restAPI.message.sendMessage(
        chatId,
        null,
        'Our platform: https://green-api.com',
        null,
        true,
        {
            customPreview: {
                title: 'GREEN-API',
                description: 'WhatsApp API for business',
                link: 'green-api.com',
            },
        }
    );
    console.log('Sent with custom preview:', custom.idMessage);
})();
