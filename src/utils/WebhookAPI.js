'use strict'
import axios from 'axios';
import CommonUtils from './CommonUtils.js'

class WebhookAPI {

    constructor(restApi) {
        this._restApi = restApi;
    }

    async sendMessage (chatId, phoneNumber, message) {
        CommonUtils.validateChatIdPhoneNumber(chatId, phoneNumber);
        CommonUtils.validateString('message', message);

        const method = 'sendMessage';
        const postData = {
            'chatId': chatId,
            'phoneNumber': phoneNumber,
            'message': message,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data
    }
    
}

export default WebhookAPI;