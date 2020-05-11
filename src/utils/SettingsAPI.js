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
     * countryInstance, webhookUrl, delaySendMessagesMilliseconds, markIncomingMessagesReaded,
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


}

export default SettingsAPI;