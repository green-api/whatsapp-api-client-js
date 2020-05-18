
class WebhooksCallbackAPI  {

    constructor(express, webhookRoutePath) {
        this._app = express;
        this._webhookRoutePath = webhookRoutePath;
        this._callbacks = new Map();
    }

    init() {
        this._app.post(this._webhookRoutePath, async (req, res, next) => {
            try {
                console.log(`Received webhook ${req.body.typeWebhook}`);
                let webhookType = null;
                if (req.body.messageData && req.body.messageData.typeMessage) {
                    webhookType = `${req.body.typeWebhook}_${req.body.messageData.typeMessage}`;
                } else {
                    webhookType = req.body.typeWebhook;
                }

                const callback = this._callbacks.get(webhookType)
                if (callback) {
                    // Found webhook callback;
                    callback.call(this, req.body);
                    // Callback invoked successfully;
                } else {
                    // Callback not found;
                };
                return res.send();
            } catch (err) {
                next(err); 
            }
        })
    }
    
    /**
     * 
     * @param {Function} callback function 
     */
    onStateInstance(callback) {
        this._callbacks.set("stateInstanceChanged", callback)
    }

    /**
     * 
     * @param {Function} callback function 
     */
    onOutgoingMessageStatus(callback) {
        this._callbacks.set("outgoingMessageStatus", (data) => {
            callback.call(this, data, data.instanceData.idInstance, data.idMessage, data.status);
        })
    }

    /**
     * 
     * @param {Function} callback function
     */
    onIncomingMessageText(callback) {
        this._callbacks.set("incomingMessageReceived_textMessage", (data) => {
            callback.call(this, data, data.instanceData.idInstance, data.idMessage, data.senderData.sender, data.messageData.typeMessage, 
                data.messageData.textMessageData.textMessage);
        })
    }

    /**
     * 
     * @param {Function} callback function 
     */
    onIncomingMessageFile(callback) {
        this._callbacks.set("incomingMessageReceived_imageMessage", (data) => {
            callback.call(this, data, data.instanceData.idInstance, data.idMessage, data.senderData.sender, data.messageData.typeMessage, 
                data.messageData.downloadUrl);
        })
    }

    /**
     * 
     * @param {Function} callback function  
     */
    onIncomingMessageLocation(callback) {
        this._callbacks.set("incomingMessageReceived_locationMessage", (data) => {
            callback.call(this, data, data.instanceData.idInstance, data.idMessage, data.senderData.sender, data.messageData.typeMessage, 
                data.messageData.locationMessageData.latitude, data.messageData.locationMessageData.longitude, data.messageData.locationMessageData.jpegThumbnail);
        })
    }

    /**
     * 
     * @param {Function} callback function  
     */
    onIncomingMessageContact(callback) {
        this._callbacks.set("incomingMessageReceived_contactMessage", (data) => {
            callback.call(this, data, data.instanceData.idInstance, data.idMessage, data.senderData.sender, data.messageData.typeMessage, 
                data.messageData.contactMessageData.displayName, data.messageData.contactMessageData.vcard);
        })
    }

    /**
     * 
     * @param {Function} callback function  
     */
    onIncomingMessageExtendedText(callback) {
        this._callbacks.set("incomingMessageReceived_extendedTextMessage", (data) => {
            callback.call(this, data, data.instanceData.idInstance, data.idMessage, data.senderData.sender, data.messageData.typeMessage, 
                data.extendedTextMessageData);
        })
    }

    /**
     * 
     * @param {Function} callback function 
     */
    onDeviceInfo(callback) {
        this._callbacks.set("deviceInfo", callback)
    }

}

export default WebhooksCallbackAPI;