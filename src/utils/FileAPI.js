'use strict'
import axios from 'axios';
import CommonUtils from './CommonUtils.js'

class FileAPI {

    constructor(restApi) {
        this._restApi = restApi;
    }

    async sendFileByUrl(chatId, phoneNumber, urlFile, fileName, caption) {
        CommonUtils.validateChatIdPhoneNumber(chatId, phoneNumber);
        CommonUtils.validateString('urlFile', urlFile);
        CommonUtils.validateString('filename', fileName);
        CommonUtils.validateString('caption', caption);

        const method = 'sendFileByUrl';
        const postData = {
            'chatId': chatId,
            'phoneNumber': phoneNumber,
            'urlFile': urlFile,
            'fileName': fileName,
            'caption': caption,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }

    async sendFileByUpload(formData) {
        const method = 'sendFileByUpload';
        const response = await axios({
            method: 'post',
            url: CommonUtils.generateMethodURL(this._restApi.params, method),
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}
        })
        return response.data; 
    }

    async downloadFile(messageId) {
        CommonUtils.validateString('messageId', messageId);

        const method = 'downloadFile';
        const url = `${this._restApi.params.host}/waInstance${this._restApi.params.idInstance}/${method}/${messageId}`
        const response = await axios.get(url);
        return response.data;
    }
}

export default FileAPI;