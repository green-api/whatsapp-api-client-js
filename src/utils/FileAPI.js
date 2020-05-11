'use strict'
import axios from 'axios';
import CommonUtils from './CommonUtils.js'

class FileAPI {

    constructor(restApi) {
        this._restApi = restApi;
    }
    /**
     * 
     * @param {String} chatId 
     * @param {Number} phoneNumber 
     * @param {String} urlFile 
     * @param {String} fileName 
     * @param {String} caption Optional
     */
    async sendFileByUrl(chatId, phoneNumber, urlFile, fileName, caption = '') {
        CommonUtils.validateChatIdPhoneNumber(chatId, phoneNumber);
        CommonUtils.validateString('urlFile', urlFile);
        CommonUtils.validateString('filename', fileName);

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
    /**
     * 
     * @param {FormData} formData 
     */
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
    /**
     * 
     * @param {String} messageId 
     */
    async downloadFile(messageId) {
        CommonUtils.validateString('messageId', messageId);

        const method = 'downloadFile';
        const url = `${this._restApi.params.host}/waInstance${this._restApi.params.idInstance}/${method}/${messageId}`
        const response = await axios.get(url);
        return response.data;
    }
}

export default FileAPI;