'use strict'
import axios from 'axios';
import CommonUtils from './CommonUtils.js'

class GroupAPI {

    constructor(restApi) {
        this._restApi = restApi;
    }

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

    async addGroupParticipant(groupId, participantChatId, participantPhone) {
        CommonUtils.validateString(groupId);
        CommonUtils.validateChatIdPhoneNumber(participantChatId, participantPhone);

        const method = 'addGroupParticipant';
        const postData = {
            'groupId': groupId,
            'participantChatId': participantChatId,
            'participantPhone': participantPhone,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }

    async getGroupData(groupId) {
        CommonUtils.validateString(groupId);

        const method = 'getGroupData';
        const postData = {
            'groupId': groupId,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }

    async removeGroupParticipant(groupId, participantChatId, participantPhone) {
        CommonUtils.validateString(groupId);
        CommonUtils.validateChatIdPhoneNumber(participantChatId, participantPhone);

        const method = 'removeGroupParticipant';
        const postData = {
            'groupId': groupId,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }

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

    async setGroupAdmin(groupId, participantChatId, participantPhone) {
        CommonUtils.validateString(groupId);

        const method = 'setGroupAdmin';
        const postData = {
            'groupId': groupId,
            'participantChatId': participantChatId,
            'participantPhone': participantPhone,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }

    async removeAdmin(groupId, participantChatId, participantPhone) {
        CommonUtils.validateString(groupId);

        const method = 'removeAdmin';
        const postData = {
            'groupId': groupId,
            'participantChatId': participantChatId,
            'participantPhone': participantPhone,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }

    async leaveGroup(groupId) {
        CommonUtils.validateString(groupId );

        const method = 'removeAdmin';
        const postData = {
            'groupId': groupId,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }

}

export default GroupAPI;