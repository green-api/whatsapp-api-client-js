'use strict'
import axios from 'axios';
import CommonUtils, {Receiver} from './CommonUtils.js'

class MessageAPI {

    constructor(restApi) {
        this._restApi = restApi;
    }
    /** Send text message to chat or phone. Method call adds message to sending queue
     * 
     * @param {String} receiver - chat id using Whatsapp format (like 17633123456@c.us - for private messages) or phone number as integer value
     * @param {String} message - text message
     */
    async sendMessage (receiver, message) {
        const _receiver = new Receiver(receiver);
        _receiver.validate();
        CommonUtils.validateString('message', message);

        const method = 'sendMessage';
        const postData = {
            'chatId': _receiver.getChatId(),
            'phoneNumber': _receiver.getPhoneNumber(),
            'message': message,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data
    }

    /**
     * 
     * @param {String} receiver - chat id using Whatsapp format (like 17633123456@c.us - for private messages) or phone number as integer value
     * @param {String} nameLocation 
     * @param {String} address 
     * @param {Number} latitude 
     * @param {Number} longitude 
     */
    async sendLocation (receiver, nameLocation, address, latitude, longitude) {
        const _receiver = new Receiver(receiver);
        _receiver.validate();
        CommonUtils.validateString('nameLocation', nameLocation);
        CommonUtils.validateString('address', address);
        CommonUtils.validateNumber('latitude', latitude);
        CommonUtils.validateNumber('longitude', longitude);

        const method = 'sendLocation';
        const postData = {
            'chatId': _receiver.getChatId(),
            'phoneNumber': _receiver.getPhoneNumber(),
            'nameLocation': nameLocation,
            'address': address,
            'latitude': latitude,
            'longitude': longitude,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data
    }

    /**
     * 
     * @param {String} receiver - chat id using Whatsapp format (like 17633123456@c.us - for private messages) or phone number as integer value
     * @param {Object} contact - object with one or more fields
     */
    async sendContact (receiver, contact) {
        const _receiver = new Receiver(receiver);
        _receiver.validate();
        CommonUtils.validateObject('contact', contact);

        const method = 'sendContact';
        const postData = {
            'chatId': _receiver.getChatId(),
            'phoneNumber': _receiver.getPhoneNumber(),
            'contact': contact,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data
    }

    /**
     * 
     * @param {String} receiver - chat id using Whatsapp format (like 17633123456@c.us - for private messages) or phone number as integer value
     * @param {String} urlLink
     */
    async sendLink (receiver, urlLink) {
        const _receiver = new Receiver(receiver);
        _receiver.validate();
        CommonUtils.validateString('urlLink', urlLink);

        const method = 'sendLink';
        const postData = {
            'chatId': _receiver.getChatId(),
            'phoneNumber': _receiver.getPhoneNumber(),
            'urlLink': urlLink,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data
    }

    /**
     * 
     * @param {String} receiver - chat id using Whatsapp format (like 17633123456@c.us - for private messages) or phone number as integer value
     * @param {String} idMessage 
     */
    async readChat (receiver, idMessage = null) {
        const _receiver = new Receiver(receiver);
        _receiver.validate();
        const method = 'readChat';
        const postData = {
            'chatId': _receiver.getChatId(),
            'phoneNumber': _receiver.getPhoneNumber(),
            'idMessage': idMessage ,
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