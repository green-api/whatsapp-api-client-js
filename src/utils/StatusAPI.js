'use strict'
import axios from 'axios';
import CommonUtils from './CommonUtils.js'

class StatusAPI{

    constructor(restAPI) {
        this._restAPI = restAPI;
    }

    async sendTextStatus(message, backgroundColor = null, font = null, participants = null){
        if (participants!==null){
            CommonUtils.validateArray('participants', participants)
            for (const number in participants){
                CommonUtils.validateChatIdPhoneNumber(number);
            }
        }
        CommonUtils.validateString('message', message);

        const method = 'sendTextStatus';

        const postData = {
            'message': message,
        }

        if (backgroundColor!==null){
            postData['backgroundColor'] = backgroundColor
        }
        if (font!=null){
            postData['font'] = font
        }
        if (participants!==null){
            postData['participants'] = participants
        }

        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    async sendVoiceStatus(urlFile, fileName, backgroundColor = null, participants = null){
        if (participants!==null){
            CommonUtils.validateArray('participants', participants)
            for (const number in participants){
                CommonUtils.validateChatIdPhoneNumber(number);
            }
        }
        CommonUtils.validateString('urlFile', urlFile);
        CommonUtils.validateString('fileName', fileName);

        const method = "sendVoiceStatus";

        const postData = {
            'urlFile': urlFile,
            'fileName': fileName,
        }

        if (backgroundColor!==null){
            postData['backgroundColor'] = backgroundColor
        }
        if (participants!==null){
            postData['participants'] = participants
        }

        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    async sendMediaStatus(urlFile, fileName, caption = null, participants = null){
        if (participants!==null){
            CommonUtils.validateArray('participants', participants)
            for (const number in participants){
                CommonUtils.validateChatIdPhoneNumber(number);
            }
        }
        if (caption!==null){
            CommonUtils.validateString('caption', caption);
        }
        CommonUtils.validateString('urlFile', urlFile);
        CommonUtils.validateString('fileName', fileName);

        const method = 'sendMediaStatus';

        const postData = {
            'urlFile': urlFile,
            'fileName': fileName,
        }

        if(caption!=null){
            postData['caption'] = caption
        }
        if(participants!=null){
            postData['participants'] = participants
        }

        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data
    }

    async getOutgoingStatuses(minutes=null){
        CommonUtils.validateInteger('minutes', minutes)

        const method = 'getOutgoingStatuses'
        const url = ""
        if(minutes!==null){
            url = (CommonUtils.generateMethodURL(this._restAPI.params, method) + '?minutes=' + minutes)
        }else{
            url = (CommonUtils.generateMethodURL(this._restAPI.params, method))
        }
        const response = await axios.get(url);
        return response.data;
    }

    async getIncomingStatuses(minutes=null){
        CommonUtils.validateInteger('minutes', minutes)

        const method = 'getIncomingStatuses'
        const url = ""
        if(minutes!==null){
            url = (CommonUtils.generateMethodURL(this._restAPI.params, method) + '?minutes=' + minutes)
        }else{
            url = (CommonUtils.generateMethodURL(this._restAPI.params, method))
        }
        const response = await axios.get(url);
        return response.data;
    }

    async getStatusStatistic(idMessage){
        CommonUtils.validateString('idMessage', idMessage)

        const method = 'getStatusStatistic'
        const response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method) + '?idMessage=' + idMessage);
        return response.data;
    }

    async deleteStatus(idMessage){
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