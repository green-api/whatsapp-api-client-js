'use strict'
import axios from 'axios';
import CommonUtils from './CommonUtils.js'

class InstanceAPI {

    constructor(restAPI) {
        this._restAPI = restAPI;
    }

    async qr() {
        const method = 'qr';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
        return response.data
    }

    async logout() {
        const method = 'logout';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
        return response.data
    }

    async reboot() {
        const method = 'reboot';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
        return response.data
    }

    async getStateInstance() {
        const method = 'getStateInstance';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
        return response.data
    }

    async getDeviceInfo() {
        const method = 'getDeviceInfo';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
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
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    /**
     * 
     * @param {String} chatId 
     * @param {String} idMessage 
     */
    async deleteMessage(chatId, idMessage) {
        CommonUtils.validateString('chatId', chatId)
        CommonUtils.validateString('idMessage', idMessage)

        const method = 'deleteMessage';
        const postData = {
            'chatId': chatId,
            'idMessage': idMessage,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    /**
     * 
     * @param {String} chatId 
     * @param {String} idMessage
     * @param {String} message
     */
    async editMessage(chatId, idMessage, message) {
        CommonUtils.validateString('chatId', chatId)
        CommonUtils.validateString('idMessage', idMessage)
        CommonUtils.validateString('message', message)

        const method = 'editMessage';
        const postData = {
            'chatId': chatId,
            'idMessage': idMessage,
            'message': message,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    /**
     * 
     * @param {Number} phoneNumber 
     */
    async getAuthorizationCode(phoneNumber) {
        CommonUtils.validateInteger('phoneNumber', phoneNumber);

        const method = 'getAuthorizationCode';
        const postData = {
            'phoneNumber': phoneNumber,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
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
        }

        this.addParam(postData, 'chatId', chatId)
        this.addParam(postData, 'phoneNumber', phoneNumber)

        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    /**
     * 
     * @param {String} chatId 
     */
    async archiveChat(chatId) {
        CommonUtils.validateChatIdPhoneNumber(chatId, undefined)

        const method = 'archiveChat';
        const postData = {

        }

        this.addParam(postData, 'chatId', chatId)

        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

     /**
     * 
     * @param {String} chatId 
     */
    async unarchiveChat(chatId) {
        CommonUtils.validateChatIdPhoneNumber(chatId, undefined)

        const method = 'unarchiveChat';
        const postData = {
            
        }

        this.addParam(postData, 'chatId', chatId)

        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    /**
     * 
     * @param {String} chatId 
     */
    async getContactInfo(chatId) {
        CommonUtils.validateChatIdPhoneNumber(chatId, undefined)

        const method = 'getContactInfo';
        const postData = {
            
        }

        this.addParam(postData, 'chatId', chatId)

        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    async getContacts() {
        const method = 'getContacts';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
        return response.data
    }

    async getChats() {
        const method = 'getChats';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
        return response.data
    }

    addParam(postData, param, value) {
        if (value && !postData.hasOwnProperty(param)) {
            postData[param] = value
        }
    }

}

export default InstanceAPI;