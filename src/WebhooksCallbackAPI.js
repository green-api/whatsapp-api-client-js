import express from 'express';
import bodyParser from 'body-parser';

class WebhooksCallbackAPI  {

    constructor(express, webhookRoutePath) {
        this._app = express;
        this._webhookRoutePath = webhookRoutePath;
        this._callbacks = new Map();
    }

    init() {
        this._app.use(bodyParser.json());
        this._app.post(this._webhookRoutePath, async (req, res) => {
            console.log(`Received webhook ${req.body.typeWebhook}`);
            const webhook = req.body;
            const callback = this._callbacks.get(webhook.typeWebhook)
            if (callback) {
                console.log(`Found webhook callback`);
                callback.call(this, webhook);
                console.log(`Callback invoked successfully!`);
            } else {
                console.log(`Callback not found`);
            };
            console.log(`End`);
            return res.send();
        })
    }
    
    /**
     * 
     * @param {Function} callback function with single parameter data 
     */
    createStateInstanceChangedHook(callback) {
        this._callbacks.set("stateInstanceChanged", callback)
    }

    /**
     * 
     * @param {Function} callback function with single parameter data 
     */
    createOutgoingMessageStatusHook(callback) {
        this._callbacks.set("outgoingMessageStatus", callback)
    }

    /**
     * 
     * @param {Function} callback function with single parameter data 
     */
    createIncomingMessageReceivedHook(callback) {
        this._callbacks.set("incomingMessageReceived", callback)
    }

    /**
     * 
     * @param {Function} callback function with single parameter data 
     */
    createDeviceInfoHook(callback) {
        this._callbacks.set("deviceInfo", callback)
    }

}

export default WebhooksCallbackAPI;