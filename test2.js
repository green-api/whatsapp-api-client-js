const { JSDOM } = require('jsdom');
const fs = require('fs');

const scriptContent = fs.readFileSync('./lib/whatsapp-api-client.min.js', 'utf8');

const html = `
<!DOCTYPE html>
<html>
<body>
<script>${scriptContent}</script>
<script>
    try {
        const api = whatsAppClient.restAPI({idInstance: '123', apiTokenInstance: 'abc'});
        console.log(api.message.sendMessage);
        api.message.sendMessage('123@c.us', null, 'test').then(() => console.log('success')).catch(e => {
            console.log("ERR_MSG: " + e.message);
        });
    } catch (e) {
        console.log("FATAL_ERROR: " + e.stack);
    }
</script>
</body>
</html>
`;

const dom = new JSDOM(html, { runScripts: "dangerously" });
