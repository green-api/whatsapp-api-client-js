'use strict'
import axios from 'axios';
import CommonUtils from './CommonUtils.js'

class ContactsAPI {

    constructor(restAPI) {
        this._restAPI = restAPI;
    }

    async addContact(chatId, firstName, lastName = null, saveInAddressbook = null) {
        CommonUtils.validateString('chatId', chatId);
        CommonUtils.validateString('firstName', firstName);
        const method = 'addContact';
        const postData = { 'chatId': chatId, 'firstName': firstName }
        if (lastName !== null) {
            CommonUtils.validateString('lastName', lastName);
            postData['lastName'] = lastName;
        }
        if (saveInAddressbook !== null) {
            CommonUtils.validateBoolean('saveInAddressbook', saveInAddressbook);
            postData['saveInAddressbook'] = saveInAddressbook;
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    async editContact(chatId, firstName, lastName = null, saveInAddressbook = null) {
        CommonUtils.validateString('chatId', chatId);
        CommonUtils.validateString('firstName', firstName);
        const method = 'editContact';
        const postData = { 'chatId': chatId, 'firstName': firstName }
        if (lastName !== null) {
            CommonUtils.validateString('lastName', lastName);
            postData['lastName'] = lastName;
        }
        if (saveInAddressbook !== null) {
            CommonUtils.validateBoolean('saveInAddressbook', saveInAddressbook);
            postData['saveInAddressbook'] = saveInAddressbook;
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    async deleteContact(chatId) {
        CommonUtils.validateString('chatId', chatId);
        const method = 'deleteContact';
        const postData = { 'chatId': chatId }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }
}

export default ContactsAPI;