import whatsAppClient from '@green-api/whatsapp-api-client';

// Get WhatsApp account info and instance state history
(async () => {
    const restAPI = whatsAppClient.restAPI({ credentialsPath: './credentials' });

    const wa = await restAPI.instance.getWaSettings();
    console.log('Phone:', wa.phone);
    console.log('State:', wa.stateInstance);
    console.log('History sync:', wa.historySyncProgress + '%');

    const history = await restAPI.instance.getStateInstanceHistory(5);
    console.log('Last 5 state changes:');
    for (const entry of history) {
        console.log(`  ${new Date(entry.timestamp * 1000).toISOString()} — ${entry.stateInstance}`);
    }
})();
