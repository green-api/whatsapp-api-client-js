'use strict'
import axios from 'axios';
import CommonUtils from './CommonUtils.js'

class StatusAPI{

    constructor(restAPI) {
        this._restAPI = restAPI;
    }

    /**
     * @param {String} message
     * @param {String} backgroundColor Optional
     * @param {String} font Optional
     * @param {Array} participants Optional
     */
    async sendTextStatus(message, backgroundColor = null, font = null, participants = null) {
        CommonUtils.validateString('message', message);

        const method = 'sendTextStatus';

        const postData = {
            'message': message,
        }

        if (backgroundColor !== null) {
            CommonUtils.validateString('backgroundColor', backgroundColor)
            postData['backgroundColor'] = backgroundColor
        }
        if (font != null) {
            CommonUtils.validateString('font', font)
            postData['font'] = font
        }
        if (participants !== null) {
            CommonUtils.validateArray('participants', participants)
            for (const number in participants){
                CommonUtils.validateChatIdPhoneNumber(number);
            }
            postData['participants'] = participants
        }

        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    /**
     * @param {String} urlFile
     * @param {String} fileName 
     * @param {String} backgroundColor Optional
     * @param {Array} participants Optional
     */
    async sendVoiceStatus(urlFile, fileName, backgroundColor = null, participants = null) {
        CommonUtils.validateString('urlFile', urlFile);
        CommonUtils.validateString('fileName', fileName);

        const method = "sendVoiceStatus";

        const postData = {
            'urlFile': urlFile,
            'fileName': fileName,
        }

        if (backgroundColor !== null) {
            CommonUtils.validateString('backgroundColor', backgroundColor)
            postData['backgroundColor'] = backgroundColor
        }
        if (participants !== null) {
            CommonUtils.validateArray('participants', participants)
            for (const number in participants){
                CommonUtils.validateChatIdPhoneNumber(number);
            }
            postData['participants'] = participants
        }

        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    /**
     * @param {String} urlFile
     * @param {String} fileName 
     * @param {String} caption Optional
     * @param {Array} participants Optional
     */
    async sendMediaStatus(urlFile, fileName, caption = null, participants = null) {
        CommonUtils.validateString('urlFile', urlFile);
        CommonUtils.validateString('fileName', fileName);

        const method = 'sendMediaStatus';

        const postData = {
            'urlFile': urlFile,
            'fileName': fileName,
        }

        if (caption != null) {
            CommonUtils.validateString('caption', caption);
            postData['caption'] = caption
        }
        if (participants != null) {
            CommonUtils.validateArray('participants', participants)
            for (const number in participants){
                CommonUtils.validateChatIdPhoneNumber(number);
            }
            postData['participants'] = participants
        }

        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    /**
     * @param {Number} minutes Optional
     */
    async getOutgoingStatuses(minutes = null) {
        const method = 'getOutgoingStatuses'
        let url = ""

        if (minutes !== null) {
            CommonUtils.validateInteger('minutes', minutes)
            url = CommonUtils.generateMethodURLWithQuery(this._restAPI.params, method, `?minutes=${minutes}`)
        } else {
            url = (CommonUtils.generateMethodURL(this._restAPI.params, method))
        }

        const response = await axios.get(url);
        return response.data;
    }

    /**
     * @param {Number} minutes Optional
     */
    async getIncomingStatuses(minutes = null) {
        const method = 'getIncomingStatuses'
        let url = ""

        if (minutes !== null) {
            CommonUtils.validateInteger('minutes', minutes)
            url = CommonUtils.generateMethodURLWithQuery(this._restAPI.params, method, `?minutes=${minutes}`)
        } else {
            url = CommonUtils.generateMethodURL(this._restAPI.params, method)
        }

        const response = await axios.get(url);
        return response.data;
    }

    /**
     * @param {String} idMessage
     */
    async getStatusStatistic(idMessage) {
        CommonUtils.validateString('idMessage', idMessage)

        const method = 'getStatusStatistic'
        const response = await axios.get(CommonUtils.generateMethodURLWithQuery(this._restAPI.params, method, `?idMessage=${idMessage}`));
        return response.data;
    }

    /**
     * @param {String} idMessage
     */
    async deleteStatus(idMessage) {
        CommonUtils.validateString('idMessage', idMessage)

        const method = 'deleteStatus'
        const postData = {
            'idMessage': idMessage
        }

        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }


}

export default StatusAPI;
