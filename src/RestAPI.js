'use strict'

import MessageAPI from './utils/MessageAPI.js'
import FileAPI from './utils/FileAPI.js'
import InstanceAPI from './utils/InstanceAPI.js';
import SettingsAPI from './utils/SettingsAPI.js';
import GroupAPI from './utils/GroupAPI.js';
import WebhookServiceAPI from './utils/WebhookServiceAPI.js';
import * as fs from 'fs'

class RestAPI {

    constructor (params) {
        
        this.params = {
            host: '',
            idInstance: '',
            apiTokenInstance: '',
            credentialsPath: null,
        };

        Object.assign(this.params, params);

        if (params.credentialsPath) {
            fs.readFileSync(params.credentialsPath)
            .toString('utf8')
            .split('\n')
            .map(item => item.split(" ").join("")) // replaceAll equivualent
            .forEach(item => {
                if (item.startsWith('API_TOKEN_INSTANCE=')) {
                    this.params.apiTokenInstance = item.replace('API_TOKEN_INSTANCE=', '').trim()
                } else if (item.startsWith('ID_INSTANCE=')) {
                    this.params.idInstance = item.replace('ID_INSTANCE=', '').trim()
                }
            })
        }

        this.message = new MessageAPI(this);
        this.file = new FileAPI(this);
        this.instance = new InstanceAPI(this);
        this.settings = new SettingsAPI(this);
        this.group = new GroupAPI(this);
        this.webhookService = new WebhookServiceAPI(this);
    }
}

export default RestAPI;