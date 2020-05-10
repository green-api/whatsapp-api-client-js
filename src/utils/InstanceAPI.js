'use strict'
import axios from 'axios';
import CommonUtils from './CommonUtils.js'

class InstanceAPI {

    constructor(restApi) {
        this._restApi = restApi;
    }

    async logout() {
        const method = 'logout';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restApi.params, method));
        return response.data
    }

    async reboot() {
        const method = 'reboot';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restApi.params, method));
        return response.data
    }

    async getStateInstance() {
        const method = 'getStateInstance';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restApi.params, method));
        return response.data
    }

    async getDeviceInfo() {
        const method = 'getDeviceInfo';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restApi.params, method));
        return response.data
    }

    /**
     * 
     * @param {Number} phoneNumber 
     */
    async checkWhatsapp(phoneNumber) {
        CommonUtils.validateInteger('phoneNumber', phoneNumber);

        const method = 'checkWhatsapp';
        const postData = {
            'phoneNumber': phoneNumber,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data
    }

    /**
     * 
     * @param {String} receiver - chat id using Whatsapp format (like 17633123456@c.us - for private messages) or phone number as integer value
     */
    async getAvatar(receiver) {
        const _receiver = new Receiver(receiver);
        _receiver.validate();

        const method = 'getAvatar';
        const postData = {
            'chatId': _receiver.getChatId(),
            'phoneNumber': _receiver.getPhoneNumber(),
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data
    }

    async getContacts() {
        const method = 'getContacts';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restApi.params, method));
        return response.data
    }

}

export default InstanceAPI;