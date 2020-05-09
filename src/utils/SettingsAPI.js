'use strict'
import axios from 'axios';
import CommonUtils from './CommonUtils.js'

class SettingsAPI {

    constructor(restApi) {
        this._restApi = restApi;
    }

    async getSettings() {
        const method = 'getSettings';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restApi.params, method));
        return response.data;
    }

    /**
     * 
     * @param {String} countryInstance 
     * @param {String} proxyInstance 
     */
    async setSettings(countryInstance, proxyInstance) {

        const method = 'setSettings';
        const postData = {
            'countryInstance': countryInstance,
            'proxyInstance': proxyInstance,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }
    /**
     * 
     * @param {String} webhookUrl 
     */
    async setWebhookUrl(webhookUrl) {
        
        const method = 'setWebhookUrl';
        const postData = {
            'webhookUrl ': webhookUrl,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }
}

export default SettingsAPI;