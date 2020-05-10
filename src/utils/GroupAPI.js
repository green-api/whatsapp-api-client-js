'use strict'
import axios from 'axios';
import CommonUtils from './CommonUtils.js'

class GroupAPI {

    constructor(restApi) {
        this._restApi = restApi;
    }
    /**
     * 
     * @param {String} groupName 
     * @param {Array} chatIds 
     * @param {Array} phones 
     */
    async createGroup(groupName, chatIds, phones) {
        CommonUtils.validateArray('chatIds', chatIds);
        CommonUtils.validateArray('phones', phones);

        const method = 'createGroup';
        const postData = {
            'groupName': groupName,
            'chatIds': chatIds,
            'phones': phones,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }

    /**
     * 
     * @param {String} groupId 
     * @param {String} participantReceiver - chat id using Whatsapp format (like 17633123456@c.us - for private messages) or phone number as integer value
     */
    async addGroupParticipant(groupId, participantReceiver) {
        CommonUtils.validateString(groupId);
        const _receiver = new Receiver(participantReceiver);
        _receiver.validate();

        const method = 'addGroupParticipant';
        const postData = {
            'groupId': groupId,
            'participantChatId': _receiver.getChatId(),
            'participantPhone': _receiver.getPhoneNumber(),
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }

    /**
     * 
     * @param {String} groupId 
     */
    async getGroupData(groupId) {
        CommonUtils.validateString(groupId);

        const method = 'getGroupData';
        const postData = {
            'groupId': groupId,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }

    /**
     * 
     * @param {String} groupId 
     * @param {String} participantReceiver - chat id using Whatsapp format (like 17633123456@c.us - for private messages) or phone number as integer value
     */
    async removeGroupParticipant(groupId, participantReceiver) {
        CommonUtils.validateString(groupId);
        const _receiver = new Receiver(participantReceiver);
        _receiver.validate();

        const method = 'removeGroupParticipant';
        const postData = {
            'groupId': groupId,
            'participantChatId': _receiver.getChatId(),
            'participantPhone': _receiver.getPhoneNumber(),
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }

    /**
     * 
     * @param {String} groupId 
     * @param {String} groupName 
     */
    async updateGroupName(groupId, groupName) {
        CommonUtils.validateString(groupId);
        CommonUtils.validateString(groupName);

        const method = 'updateGroupName';
        const postData = {
            'groupId': groupId,
            'groupName': groupName,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }

    /**
     * 
     * @param {String} groupId 
     * @param {String} participantReceiver - chat id using Whatsapp format (like 17633123456@c.us - for private messages) or phone number as integer value
     */
    async setGroupAdmin(groupId, participantReceiver) {
        CommonUtils.validateString(groupId);
        const _receiver = new Receiver(participantReceiver);
        _receiver.validate();

        const method = 'setGroupAdmin';
        const postData = {
            'groupId': groupId,
            'participantChatId': _receiver.getChatId(),
            'participantPhone': _receiver.getPhoneNumber(),
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }

    /**
     * 
     * @param {String} groupId 
     * @param {String} participantReceiver - chat id using Whatsapp format (like 17633123456@c.us - for private messages) or phone number as integer value
     */
    async removeAdmin(groupId, participantReceiver) {
        CommonUtils.validateString(groupId);
        const _receiver = new Receiver(participantReceiver);
        _receiver.validate();

        const method = 'removeAdmin';
        const postData = {
            'groupId': groupId,
            'participantChatId': _receiver.getChatId(),
            'participantPhone': _receiver.getPhoneNumber(),
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }

    /**
     * 
     * @param {String} groupId 
     */
    async leaveGroup(groupId) {
        CommonUtils.validateString(groupId);

        const method = 'removeAdmin';
        const postData = {
            'groupId': groupId,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }

}

export default GroupAPI;