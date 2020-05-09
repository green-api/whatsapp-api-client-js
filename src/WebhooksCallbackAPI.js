import express from 'express';
import bodyParser from 'body-parser';

class WebhooksCallbackAPI  {

    constructor(express) {
        this.app = express;
        this.callbacks = new Map();
    }

    init() {

        this.app.use(bodyParser.json());
        this.app.post('/webhooks', async (req, res) => {
            
            console.log(`Received webhook = ${eq.body}`);
            const webhooks = req.body;
        
            for(current of webhooks) {
                console.log(`Processing webhook = ${current.eventType}`);

                const  type = current.eventType || null;

                callback = this.callbacks.get(type)
                if (callback)
                    callback.call(this, req.body);
            }
        });

    }
    
    /**
     * 
     * @param {Function} callback function with single parameter data 
     */
    createStateInstanceChangedHook(callback) {
        this.callbacks.set("stateInstanceChanged", callback)
    }

    /**
     * 
     * @param {Function} callback function with single parameter data 
     */
    createOutgoingMessageStatusHook(callback) {
        this.callbacks.set("outgoingMessageStatus", callback)
    }

    /**
     * 
     * @param {Function} callback function with single parameter data 
     */
    createIncomingMessageReceivedHook(callback) {
        this.callbacks.set("incomingMessageReceived", callback)
    }

    /**
     * 
     * @param {Function} callback function with single parameter data 
     */
    createDeviceInfoHook(callback) {
        this.callbacks.set("deviceInfo", callback)
    }

}

export default WebhooksCallbackAPI;