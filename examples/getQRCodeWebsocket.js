const WebSocket = require('ws');

// instance manager https://console.green-api.com
const idInstance = ''; // your instance id
const apiTokenInstance = ''; // your instance api token

const ws = new WebSocket(`wss://api.green-api.com/waInstance${idInstance}/scanqrcode/${apiTokenInstance}`);

ws.on('open', () => {
    console.log("websocket is open")
});

ws.on('message', (response) => {
    const message = JSON.parse(response)
    if (message.type === "qrCode") {
        console.log("QR code received")
        console.log(message.message)
    } else {
        console.log(response)
    }
});

ws.on('error', (response) => {
    console.log(`websocket error: ${response}`)
});

ws.on('close', () => {
    console.log(`websocket closed`)
});