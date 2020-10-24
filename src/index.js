'use strict'
import RestAPI from './RestAPI.js';
import commonUtils from './utils/CommonUtils.js'
import configuration from './utils/configuration.js'
import WebhookCallBackAPI from './WebhooksCallbackAPI.js'

function checkInitParams(params = {}) {

    if (params.host) {
        commonUtils.validateString("host", params.host)
    } else {
        params.host = configuration.defaultHost
    }
    if (params.credentialsPath) {
        commonUtils.validatePath("credentialsPath", params.credentialsPath)
    } else {
        commonUtils.validateString("idInstance", params.idInstance)
        commonUtils.validateString("apiTokenInstance", params.apiTokenInstance)
    }
    
}

const restAPI = (params = {}) => {
    checkInitParams(params);
    return new RestAPI(params)
}

const webhookAPI = (express, webhookRoutePath) => {
    const api = new WebhookCallBackAPI(express, webhookRoutePath);
    api.init()
    return api;
}

export default {
    restAPI,
    webhookAPI
}