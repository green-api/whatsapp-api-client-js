'use strict'
import RestAPI from './RestAPI.js';
import commonUtils from './utils/CommonUtils.js'
import configuration from './utils/configuration.js'

async function checkInitParams(params = {}) {
    return new Promise((resolve, reject) => {
        if (params.host) {
            commonUtils.validateString("Host", params.host)
        } else {
            params.host = configuration.defaultHost
        }

        commonUtils.validateString("idInstance", params.idInstance)
        commonUtils.validateString("apiTokenInstance", params.apiTokenInstance)

        resolve(params)
    })
}

const restAPI = async (params = {}) => {
    return checkInitParams(params).then((p) => {
        return new RestAPI(p)
    })
}

export default restAPI;