'use strict'
import axios from 'axios';
import fs from 'fs';
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

    async checkWhatsapp(phoneNumber) {
        CommonUtils.validateInteger('phoneNumber', phoneNumber);
        const method = 'checkWhatsapp';
        const postData = { 'phoneNumber': phoneNumber }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    async getAuthorizationCode(phoneNumber) {
        CommonUtils.validateInteger('phoneNumber', phoneNumber);
        const method = 'getAuthorizationCode';
        const postData = { 'phoneNumber': phoneNumber }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    async getAvatar(chatId, phoneNumber) {
        CommonUtils.validateChatIdPhoneNumber(chatId, phoneNumber)
        const method = 'getAvatar';
        const postData = {}
        this.addChadIdParam(postData, chatId)
        this.addPhoneParam(postData, phoneNumber)
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    async archiveChat(chatId) {
        CommonUtils.validateChatIdPhoneNumber(chatId, undefined)
        const method = 'archiveChat';
        const postData = {}
        this.addChadIdParam(postData, chatId)
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    async unarchiveChat(chatId) {
        CommonUtils.validateChatIdPhoneNumber(chatId, undefined)
        const method = 'unarchiveChat';
        const postData = {}
        this.addChadIdParam(postData, chatId)
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    async getContactInfo(chatId) {
        CommonUtils.validateChatIdPhoneNumber(chatId, undefined)
        const method = 'getContactInfo';
        const postData = {}
        this.addChadIdParam(postData, chatId)
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    async getContacts() {
        const method = 'getContacts';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
        return response.data
    }

    async getChats(count = null) {
        const method = 'getChats';
        let response;
        if (count !== null) {
            CommonUtils.validateInteger('count', count);
            response = await axios.get(CommonUtils.generateMethodURLWithQuery(this._restAPI.params, method, `?count=${count}`));
        } else {
            response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
        }
        return response.data
    }

    async sendTyping(chatId, typingTime = null, typingType = null) {
        CommonUtils.validateString('chatId', chatId);
        const method = 'sendTyping';
        const postData = { 'chatId': chatId }
        if (typingTime !== null) {
            CommonUtils.validateInteger('typingTime', typingTime);
            postData['typingTime'] = typingTime;
        }
        if (typingType !== null) {
            CommonUtils.validateString('typingType', typingType);
            postData['typingType'] = typingType;
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    async editMessage(chatId, idMessage, message) {
        CommonUtils.validateString('chatId', chatId);
        CommonUtils.validateString('idMessage', idMessage);
        CommonUtils.validateString('message', message);
        const method = 'editMessage';
        const postData = { 'chatId': chatId, 'idMessage': idMessage, 'message': message }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    async deleteMessage(chatId, idMessage, onlySenderDelete = null) {
        CommonUtils.validateString('chatId', chatId);
        CommonUtils.validateString('idMessage', idMessage);
        const method = 'deleteMessage';
        const postData = { 'chatId': chatId, 'idMessage': idMessage }
        if (onlySenderDelete !== null) {
            CommonUtils.validateBoolean('onlySenderDelete', onlySenderDelete);
            postData['onlySenderDelete'] = onlySenderDelete;
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    async setDisappearingChat(chatId, ephemeralExpiration) {
        CommonUtils.validateString('chatId', chatId);
        CommonUtils.validateInteger('ephemeralExpiration', ephemeralExpiration);
        const method = 'setDisappearingChat';
        const postData = { 'chatId': chatId, 'ephemeralExpiration': ephemeralExpiration }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    async setProfilePicture(filePath) {
        CommonUtils.validateString('filePath', filePath);
        const method = 'setProfilePicture';
        const fileStream = fs.createReadStream(filePath);
        const fileData = [];
        for await (const chunk of fileStream) {
            fileData.push(chunk);
        }
        const blob = new Blob(fileData, { type: 'image/jpeg' });
        const formData = new FormData();
        formData.append('file', blob, 'avatar.jpg');
        const response = await axios({
            method: 'post',
            url: CommonUtils.generateMethodURL(this._restAPI.params, method),
            data: formData,
            headers: { 'Content-Type': 'image/jpeg' },
        });
        return response.data
    }

    async updateApiToken() {
        const method = 'updateApiToken';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
        return response.data
    }

    async getWaSettings() {
        const method = 'getWaSettings';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
        return response.data
    }

    async getStateInstanceHistory(count = null) {
        const method = 'getStateInstanceHistory';
        let response;
        if (count !== null) {
            CommonUtils.validateInteger('count', count);
            response = await axios.get(CommonUtils.generateMethodURLWithQuery(this._restAPI.params, method, `?count=${count}`));
        } else {
            response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
        }
        return response.data
    }

    addChadIdParam(postData, chatId) {
        if (chatId) {
            postData.chatId = chatId
        }
    }

    addPhoneParam(postData, phoneNumber) {
        if (phoneNumber) {
            postData.phoneNumber = phoneNumber
        }
    }

}

export default InstanceAPI;