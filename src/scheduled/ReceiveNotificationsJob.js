
class ReceiveNotificationsJob {

    timerId;
    intervalSec; 
    needInterrupt = false

    constructor(webhookServiceApi) {
        this.webhookServiceApi = webhookServiceApi;
        this.intervalSec = Number.parseInt('1') 
    }
    
    run = async () => {
        clearInterval(this.timerId)
        try {
            let response
            while (response = await this.webhookServiceApi.receiveNotification()) {
                let webhookBody = response.body;
                if (webhookBody.typeWebhook === this.webhookServiceApi.noteTypes.incomingMessageReceived) {
                    if (webhookBody.messageData.typeMessage == "imageMessage") {
                        this.callCallback(this.webhookServiceApi.callbackTypes.onReceivingMessageImage, webhookBody)
                    } else if (webhookBody.messageData.typeMessage == "videoMessage") {
                        this.callCallback(this.webhookServiceApi.callbackTypes.onReceivingMessageVideo, webhookBody)
                    } else if (webhookBody.messageData.typeMessage == "documentMessage") {
                        this.callCallback(this.webhookServiceApi.callbackTypes.onReceivingMessageDocument, webhookBody)
                    } else if (webhookBody.messageData.typeMessage == "audioMessage") {
                        this.callCallback(this.webhookServiceApi.callbackTypes.onReceivingMessageAudio, webhookBody)
                    } else if (webhookBody.messageData.typeMessage == "documentMessage") {
                        this.callCallback(this.webhookServiceApi.callbackTypes.onReceivingMessageDocument, webhookBody)
                    } else if (webhookBody.messageData.typeMessage == "textMessage") {
                        this.callCallback(this.webhookServiceApi.callbackTypes.onReceivingMessageText, webhookBody)
                    } else if (webhookBody.messageData.typeMessage == "extendedTextMessage") {
                        this.callCallback(this.webhookServiceApi.callbackTypes.onReceivingMessageTextURL, webhookBody)
                    } else if (webhookBody.messageData.typeMessage == "contactMessage") {
                        this.callCallback(this.webhookServiceApi.callbackTypes.onReceivingMessageContact, webhookBody)
                    } else if (webhookBody.messageData.typeMessage == "locationMessage") {
                        this.callCallback(this.webhookServiceApi.callbackTypes.onReceivingMessageLocation, webhookBody)
                    }
                } else if (webhookBody.typeWebhook === this.webhookServiceApi.noteTypes.stateInstanceChanged) { 
                    this.callCallback(this.webhookServiceApi.callbackTypes.onReceivingAccountStatus, webhookBody)
                } else if (webhookBody.typeWebhook === this.webhookServiceApi.noteTypes.outgoingMessageStatus) { 
                    this.callCallback(this.webhookServiceApi.callbackTypes.onReceivingOutboundMessageStatus, webhookBody)
                } else if (webhookBody.typeWebhook === this.webhookServiceApi.noteTypes.deviceInfo) { 
                    this.callCallback(this.webhookServiceApi.callbackTypes.onReceivingDeviceStatus, webhookBody)
                }
                await this.webhookServiceApi.deleteNotification(response.receiptId);
            }
        } catch (ex) {
            console.error(ex.toString());
        }
        if (!this.needInterrupt) {
            this.timerId = setInterval(this.run, this.intervalSec * 1000);
        }
    }

    callCallback(webhookType, body) {
        const callback = this.webhookServiceApi._callbacks.get(webhookType)
        if (callback) {
            // Found webhook callback;
            callback.call(this, body);
            // Callback invoked successfully;
        } else {
            // Callback not found;
        };
    }
    
}

export default ReceiveNotificationsJob;