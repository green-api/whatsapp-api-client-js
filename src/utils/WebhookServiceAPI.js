'use strict'
import axios from 'axios';
import CommonUtils from './CommonUtils.js'

class WebhookServiceAPI {

    constructor(restAPI) {
        this._restAPI = restAPI;
    }

    async receiveMessage() {
        const method = 'receiveWebhook';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
        return response.data
    }

    /**
     * 
     * @param {Number} deliveryTag 
     */
    async confirmMessage(deliveryTag) {
        CommonUtils.validateInteger('deliveryTag', deliveryTag);

        const method = 'deleteWebhook';
        const response = await axios.delete(`${CommonUtils.generateMethodURL(this._restAPI.params, method)}/${deliveryTag}`);
        return response.data
    }

}

export default WebhookServiceAPI;