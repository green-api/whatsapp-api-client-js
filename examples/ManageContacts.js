import whatsAppClient from '@green-api/whatsapp-api-client';

// Add, edit, and delete a contact
(async () => {
    const restAPI = whatsAppClient.restAPI({ credentialsPath: './credentials' });

    const chatId = '34534543535@c.us';

    const added = await restAPI.contacts.addContact(chatId, 'Ivan', 'Ivanov');
    console.log('Added:', added.addContact);

    const edited = await restAPI.contacts.editContact(chatId, 'Ivan', 'Petrov');
    console.log('Edited:', edited.editContact);

    const deleted = await restAPI.contacts.deleteContact(chatId);
    console.log('Deleted:', deleted.deleteContact);
})().catch(err => {
    console.error('Error:', err.message);
    if (err.response) {
        console.error('Status:', err.response.status);
        console.error('Response:', JSON.stringify(err.response.data));
    }
    process.exit(1);
});
