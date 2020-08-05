const WebSocket = require('ws');
const dotenv = require("dotenv");
 
dotenv.config()

const ws = new WebSocket(`wss://api.green-api.com/waInstance${process.env.ID_INSTANCE}/scanqrcode/${process.env.API_TOKEN_INSTANCE}`);

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