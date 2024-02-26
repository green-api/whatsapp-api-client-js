'use strict'
import axios from 'axios';
import CommonUtils from './CommonUtils.js'
import mime from "mime";
import fs from "fs";

class GroupAPI {

    constructor(restAPI) {
        this._restAPI = restAPI;
    }
    /**
     * 
     * @param {String} groupName 
     * @param {Array} chatIds
     */
    async createGroup(groupName, chatIds) {
        CommonUtils.validateString('groupName', groupName);
        CommonUtils.validateArray('chatIds', chatIds);

        const method = 'createGroup';
        const postData = {
            'groupName': groupName,
            'chatIds': chatIds
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data;
    }

    /**
     * 
     * @param {String} groupId 
     * @param {String} participantChatId 
     * @param {Number} participantPhone 
     */
    async addGroupParticipant(groupId, participantChatId, participantPhone) {
        CommonUtils.validateString('groupId', groupId);
        CommonUtils.validateChatIdPhoneNumber(participantChatId, participantPhone);

        const method = 'addGroupParticipant';
        const postData = {
            'groupId': groupId,
            'participantChatId': participantChatId,
            'participantPhone': participantPhone,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data;
    }

    /**
     * 
     * @param {String} groupId 
     */
    async getGroupData(groupId) {
        CommonUtils.validateString('groupId', groupId);

        const method = 'getGroupData';
        const postData = {
            'groupId': groupId,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data;
    }

    /**
     * 
     * @param {String} groupId 
     * @param {String} participantChatId 
     * @param {Number} participantPhone 
     */
    async removeGroupParticipant(groupId, participantChatId, participantPhone) {
        CommonUtils.validateString('groupId', groupId);
        CommonUtils.validateChatIdPhoneNumber(participantChatId, participantPhone);

        const method = 'removeGroupParticipant';
        const postData = {
            'groupId': groupId,
            'participantChatId': participantChatId,
            'participantPhone': participantPhone,
        };
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data;
    }

    /**
     * 
     * @param {String} groupId 
     * @param {String} groupName 
     */
    async updateGroupName(groupId, groupName) {
        CommonUtils.validateString('groupId', groupId);
        CommonUtils.validateString('groupName', groupName);

        const method = 'updateGroupName';
        const postData = {
            'groupId': groupId,
            'groupName': groupName,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data;
    }

    /**
     * 
     * @param {String} groupId 
     * @param {String} participantChatId 
     * @param {Number} participantPhone 
     */
    async setGroupAdmin(groupId, participantChatId, participantPhone) {
        CommonUtils.validateString('groupId', groupId);

        const method = 'setGroupAdmin';
        const postData = {
            'groupId': groupId,
            'participantChatId': participantChatId,
            'participantPhone': participantPhone,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data;
    }

    /**
     * 
     * @param {String} groupId 
     * @param {String} participantChatId 
     * @param {Number} participantPhone 
     */
    async removeAdmin(groupId, participantChatId, participantPhone) {
        CommonUtils.validateString('groupId', groupId);

        const method = 'removeAdmin';
        const postData = {
            'groupId': groupId,
            'participantChatId': participantChatId,
            'participantPhone': participantPhone,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data;
    }

    /**
     * 
     * @param {String} groupId 
     */
    async leaveGroup(groupId) {
        CommonUtils.validateString('groupId', groupId);

        const method = 'removeAdmin';
        const postData = {
            'groupId': groupId,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data;
    }

    /**
     * @param {String} filePath
     * @param {String} groupId
     */
    async setGroupPicture(groupId, filePath) {
        CommonUtils.validateString("filePath", filePath)

        const method = "setGroupPicture";

        const fileData = fs.readFileSync(filePath)

        const response = await axios({
            method: "post",
            url: CommonUtils.generateMethodURL(this._restAPI.params, method),
            data: fileData,
            headers: {"Content-Type": mime.getType(filePath)}
        })
        return response.data;
    }
}

export default GroupAPI;