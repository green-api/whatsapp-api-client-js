import whatsAppClient from '@green-api/whatsapp-api-client';

const avatarPath = './avatar.jpg'; // path to a JPG image file

// Set a new profile picture for the WhatsApp account
(async () => {
    const restAPI = whatsAppClient.restAPI({ credentialsPath: './credentials' });

    const result = await restAPI.instance.setProfilePicture(avatarPath);
    if (result.setProfilePicture) {
        console.log('Avatar updated:', result.urlAvatar);
    } else {
        console.log('Failed:', result.reason);
    }
})();
