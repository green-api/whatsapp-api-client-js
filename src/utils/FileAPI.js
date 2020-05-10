'use strict'
import axios from 'axios';
import CommonUtils, {Receiver} from './CommonUtils.js'

class FileAPI {

    constructor(restApi) {
        this._restApi = restApi;
    }
    /**
     * 
     * @param {String} receiver - chat id using Whatsapp format (like 17633123456@c.us - for private messages) or phone number as integer value
     * @param {String} urlFile 
     * @param {String} fileName 
     * @param {String} caption Optional
     */
    async sendFileByUrl(receiver, urlFile, fileName, caption = '') {
        const _receiver = new Receiver(receiver);
        _receiver.validate();
        CommonUtils.validateString('urlFile', urlFile);
        CommonUtils.validateString('filename', fileName);

        const method = 'sendFileByUrl';
        const postData = {
            'chatId': _receiver.getChatId(),
            'phoneNumber': _receiver.getPhoneNumber(),
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