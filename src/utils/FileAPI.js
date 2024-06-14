'use strict'
import axios from "axios";
import fs from "fs";
import mime from "mime";

import CommonUtils from "./CommonUtils.js"

class FileAPI {

    constructor(restAPI) {
        this._restAPI = restAPI;
    }

    /**
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
            'urlFile': urlFile,
            'fileName': fileName,
            'caption': caption,
        }

        this.addChadIdParam(postData, chatId)
        this.addPhoneParam(postData, phoneNumber)

        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
        return response.data;
    }

    /**
     * @param {String} filePath
     */
    async uploadFile(filePath) {
        CommonUtils.validateString("filePath", filePath)

        const method = "uploadFile";

        const fileData = fs.readFileSync(filePath)

        const response = await axios({
            method: "post",
            url: CommonUtils.generateMethodURL(this._restAPI.params, method),
            data: fileData,
            headers: {
                "Content-Type": mime.getType(filePath),
                "GA-Filename": filePath.split('/').pop().split('\\').pop()
            }
        })
        return response.data;
    }

    /**
     * @param {FormData} formData
     */
    async sendFileByUpload(formData) {
        const method = 'sendFileByUpload';
        const response = await axios({
            method: 'post',
            url: CommonUtils.generateMethodURL(this._restAPI.params, method),
            data: formData,
            headers: formData.getHeaders()
        })
        return response.data;
    }

    /**
     * @param {String} chatId
     * @param {String} idMessage
     */
    async downloadFile(chatId, idMessage) {
        CommonUtils.validateChatIdPhoneNumber(chatId, undefined);
        CommonUtils.validateString('message', idMessage);

        const method = 'downloadFile';

        const postData = {
            'idMessage': idMessage,
        }

        this.addChadIdParam(postData, chatId)

        const response = await axios.post(CommonUtils.generateMethodURL(this._restAPI.params, method), postData);
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

export default FileAPI;
