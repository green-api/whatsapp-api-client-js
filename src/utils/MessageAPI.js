'use strict'
import axios from 'axios';
import CommonUtils from './CommonUtils.js'

class MessageAPI {

    constructor(restApi) {
        this._restApi = restApi;
    }
    /** Send text message to chat or phone. Method call adds message to sending queue
     * 
     * @param {String} chatId - chat id using Whatsapp format (17633123456@c.us - for private messages). 
     *  Mandatory if phoneNumber is empty
     * @param {Number} phoneNumber - receiver phone number using international format whithout + sign.
     * Mandatory if chatId is empty
     * @param {String} message - text message
     */
    async sendMessage (chatId, phoneNumber, message) {
        CommonUtils.validateChatIdPhoneNumber(chatId, phoneNumber);
        CommonUtils.validateString('message', message);

        const method = 'sendMessage';
        const postData = {
            'chatId': chatId,
            'phoneNumber': phoneNumber,
            'message': message,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data
    }

    async showMessagesQueue() {
        const method = 'showMessagesQueue';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restApi.params, method));
        return response.data
    }

    async clearMessagesQueue() {
        const method = 'clearMessagesQueue';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restApi.params, method));
        return response.data
    }

    async lastIncomingMessages() {
        const method = 'lastIncomingMessages';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restApi.params, method));
        return response.data
    }

    async lastOutgoingMessages() {
        const method = 'lastOutgoingMessages';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restApi.params, method));
        return response.data
    }
}

export default MessageAPI;