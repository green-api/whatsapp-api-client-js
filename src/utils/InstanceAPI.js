'use strict'
import axios from 'axios';
import fs from 'fs';
import CommonUtils from './CommonUtils.js'

class InstanceAPI {

    constructor(restAPI) {
        this._restAPI = restAPI;
    }

    /**
     * Gets QR code for instance authorization
     */
    async qr() {
        const method = 'qr';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
        return response.data
    }

    /**
     * Logs out of WhatsApp account
     */
    async logout() {
        const method = 'logout';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
        return response.data
    }

    /**
     * Reboots the instance
     */
    async reboot() {
        const method = 'reboot';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
        return response.data
    }

    /**
     * Returns the current authorization state of the instance
     */
    async getStateInstance() {
        const method = 'getStateInstance';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
        return response.data
    }

    /**
     * Returns information about the device (phone) on which WhatsApp Business is running
     */
    async getDeviceInfo() {
        const method = 'getDeviceInfo';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
        return response.data
    }

    /**
     * Checks whether a phone number has a WhatsApp account
     * @param {Number} phoneNumber
     */
    async checkWhatsapp(phoneNumber) {
        CommonUtils.validateInteger('phoneNumber', phoneNumber);
        const method = 'checkWhatsapp';
        const postData = { 'phoneNumber': phoneNumber }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    /**
     * Gets an authorization code to log in by phone number instead of QR code
     * @param {Number} phoneNumber
     */
    async getAuthorizationCode(phoneNumber) {
        CommonUtils.validateInteger('phoneNumber', phoneNumber);
        const method = 'getAuthorizationCode';
        const postData = { 'phoneNumber': phoneNumber }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    /**
     * Gets the avatar of a contact or group chat
     * @param {String} chatId
     * @param {Number} phoneNumber
     */
    async getAvatar(chatId, phoneNumber) {
        CommonUtils.validateChatIdPhoneNumber(chatId, phoneNumber)
        const method = 'getAvatar';
        const postData = {}
        this.addChadIdParam(postData, chatId)
        this.addPhoneParam(postData, phoneNumber)
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    /**
     * Archives a chat
     * @param {String} chatId
     */
    async archiveChat(chatId) {
        CommonUtils.validateChatIdPhoneNumber(chatId, undefined)
        const method = 'archiveChat';
        const postData = {}
        this.addChadIdParam(postData, chatId)
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    /**
     * Unarchives a chat
     * @param {String} chatId
     */
    async unarchiveChat(chatId) {
        CommonUtils.validateChatIdPhoneNumber(chatId, undefined)
        const method = 'unarchiveChat';
        const postData = {}
        this.addChadIdParam(postData, chatId)
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    /**
     * Gets information about a contact
     * @param {String} chatId
     */
    async getContactInfo(chatId) {
        CommonUtils.validateChatIdPhoneNumber(chatId, undefined)
        const method = 'getContactInfo';
        const postData = {}
        this.addChadIdParam(postData, chatId)
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    /**
     * Gets a list of the current account contacts
     */
    async getContacts() {
        const method = 'getContacts';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
        return response.data
    }

    /**
     * Gets a list of chats sorted by activity
     * @param {Number} count - optional number of chats to retrieve
     */
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

    /**
     * Sends a typing or recording indicator to a chat
     * @param {String} chatId
     * @param {Number} typingTime - duration in ms (1000–20000)
     * @param {String} typingType - use "recording" for audio recording indicator
     */
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

    /**
     * Edits a previously sent text message (within 15 minutes of sending)
     * @param {String} chatId
     * @param {String} idMessage
     * @param {String} message - new message text
     */
    async editMessage(chatId, idMessage, message) {
        CommonUtils.validateString('chatId', chatId);
        CommonUtils.validateString('idMessage', idMessage);
        CommonUtils.validateString('message', message);
        const method = 'editMessage';
        const postData = { 'chatId': chatId, 'idMessage': idMessage, 'message': message }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    /**
     * Deletes a message from a chat
     * @param {String} chatId
     * @param {String} idMessage
     * @param {Boolean} onlySenderDelete - if true, deletes only for the sender
     */
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

    /**
     * Configures disappearing messages for a chat
     * @param {String} chatId
     * @param {Number} ephemeralExpiration - lifetime in seconds: 0 (off), 86400 (1d), 604800 (7d), 7776000 (90d)
     */
    async setDisappearingChat(chatId, ephemeralExpiration) {
        CommonUtils.validateString('chatId', chatId);
        CommonUtils.validateInteger('ephemeralExpiration', ephemeralExpiration);
        const method = 'setDisappearingChat';
        const postData = { 'chatId': chatId, 'ephemeralExpiration': ephemeralExpiration }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    /**
     * Sets a profile picture for the WhatsApp account
     * @param {String} filePath - path to a JPG image file
     */
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

    /**
     * Generates a new API token for the instance (Beta)
     */
    async updateApiToken() {
        const method = 'updateApiToken';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
        return response.data
    }

    /**
     * Returns WhatsApp account information for the authorized instance
     */
    async getWaSettings() {
        const method = 'getWaSettings';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
        return response.data
    }

    /**
     * Returns the authorization state history of the instance
     * @param {Number} count - number of records to retrieve (default 100)
     */
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