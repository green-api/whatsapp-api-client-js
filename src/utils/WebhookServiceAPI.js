'use strict'
import axios from 'axios';
import CommonUtils from './CommonUtils.js'

class WebhookServiceAPI {

    constructor(restAPI) {
        this._restAPI = restAPI;
    }

    async receiveMessage() {
        const method = 'receiveNotification';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
        return response.data
    }

    /**
     * 
     * @param {Number} receiptId 
     */
    async confirmMessage(receiptId) {
        CommonUtils.validateInteger('receiptId', receiptId);

        const method = 'deleteNotification';
        const response = await axios.delete(`${CommonUtils.generateMethodURL(this._restAPI.params, method)}/${receiptId}`);
        return response.data
    }

}

export default WebhookServiceAPI;