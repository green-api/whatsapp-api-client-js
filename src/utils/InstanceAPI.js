'use strict'
import axios from 'axios';
import CommonUtils from './CommonUtils.js'

class InstanceAPI {

    constructor(greenAPI) {
        this._greenAPI = greenAPI;
    }

    async logout() {
        const method = 'logout';
        const response = await axios.get(CommonUtils.generateMethodURL(this._greenAPI.params, method));
        return response.data
    }

    async reboot() {
        const method = 'reboot';
        const response = await axios.get(CommonUtils.generateMethodURL(this._greenAPI.params, method));
        return response.data
    }

    async getStateInstance() {
        const method = 'getStateInstance';
        const response = await axios.get(CommonUtils.generateMethodURL(this._greenAPI.params, method));
        return response.data
    }

    async getDeviceInfo() {
        const method = 'getDeviceInfo';
        const response = await axios.get(CommonUtils.generateMethodURL(this._greenAPI.params, method));
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
        const response = await axios.post(CommonUtils.generateMethodURL(this._greenAPI.params, method), postData);
        return response.data
    }

    /**
     * 
     * @param {String} chatId 
     * @param {Number} phoneNumber 
     */
    async getAvatar(chatId, phoneNumber) {
        CommonUtils.validateChatIdPhoneNumber(chatId, phoneNumber)

        const method = 'getAvatar';
        const postData = {
            'chatId': chatId,
            'phoneNumber': phoneNumber,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._greenAPI.params, method), postData);
        return response.data
    }

    async getContacts() {
        const method = 'getContacts';
        const response = await axios.get(CommonUtils.generateMethodURL(this._greenAPI.params, method));
        return response.data
    }

}

export default InstanceAPI;