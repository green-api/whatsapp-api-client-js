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
     * Change instance account settings. You can specify which settings to update. 
     * Instance will be restarted as a result of method.
     *
     * @param {Object} settings - js object that consists of one or more props:
     * countryInstance, webhookUrl, delaySendMessagesMilliseconds, markIncomingMessagesReaded, proxyInstance 
     * for example:
     * 
     * settings = {
     *   countryInstance: "ru",
     *   delaySendMessagesMilliseconds: 500
     * }
     * 
     */
    async setSettings(settings) {
        CommonUtils.validateObject("settings", settings)
        
        const method = 'setSettings';
        const postData = settings
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }

    /**
     * 
     * @param {String} countryInstance 
     */
    async setCountry(countryInstance) {
        CommonUtils.validateString("countryInstance", countryInstance)
        
        const method = 'setSettings';
        const postData = {
            'countryInstance': countryInstance,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }

    /**
     * 
     * @param {String} webhookUrl 
     */
    async setWebhook(webhookUrl) {
        CommonUtils.validateString("webhookUrl", webhookUrl)
        
        const method = 'setSettings';
        const postData = {
            'webhookUrl': webhookUrl,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }

    /**
     * 
     * @param {String} delaySendMessagesMilliseconds 
     */
    async setSendingDelay(delaySendMessagesMilliseconds) {
        CommonUtils.validateInteger("delaySendMessagesMilliseconds", delaySendMessagesMilliseconds)
        
        const method = 'setSettings';
        const postData = {
            'delaySendMessagesMilliseconds': delaySendMessagesMilliseconds,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }

    /**
     * 
     * @param {String} - possible values are 'yes' or 'no'
     */
    async setMarkReaded(markIncomingMessagesReaded) {
        CommonUtils.validateString("webhookUrl", markIncomingMessagesReaded )
        
        const method = 'setSettings';
        const postData = {
            'markIncomingMessagesReaded': markIncomingMessagesReaded ,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }

    /**
     * 
     * @param {String} proxyInstance 
     */
    async setProxy(proxyInstance) {
        CommonUtils.validateString("proxyInstance", proxyInstance)
        
        const method = 'setSettings';
        const postData = {
            'proxyInstance': proxyInstance,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._restApi.params, method), postData);
        return response.data;
    }
}

export default SettingsAPI;