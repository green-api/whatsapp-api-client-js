'use strict'

import MessageAPI from './utils/MessageAPI.js'
import FileAPI from './utils/FileAPI.js'
import InstanceAPI from './utils/InstanceAPI.js';
import SettingsAPI from './utils/SettingsAPI.js';
import GroupAPI from './utils/GroupAPI.js';
import WebhookServiceAPI from './utils/WebhookServiceAPI.js';
import * as fs from 'fs'
import StatusAPI from './utils/StatusAPI.js';
import ContactsAPI from './utils/ContactsAPI.js';

class RestAPI {

    constructor(params) {

        this.params = {
            host: "",
            media: "",
            idInstance: "",
            apiTokenInstance: "",
            credentialsPath: null,
        };

        Object.assign(this.params, params);

        if (params.credentialsPath) {
            fs.readFileSync(params.credentialsPath)
                .toString('utf8')
                .split('\n')
                .map(item => item.split(" ").join(""))
                .forEach(item => {
                    if (item.startsWith('API_TOKEN_INSTANCE=')) {
                        this.params.apiTokenInstance = item.replace('API_TOKEN_INSTANCE=', '').trim().replace(/^["']|["']$/g, '')
                    } else if (item.startsWith('ID_INSTANCE=')) {
                        this.params.idInstance = item.replace('ID_INSTANCE=', '').trim().replace(/^["']|["']$/g, '')
                    }
                })
        }

        this.message = new MessageAPI(this);
        this.file = new FileAPI(this);
        this.instance = new InstanceAPI(this);
        this.settings = new SettingsAPI(this);
        this.group = new GroupAPI(this);
        this.webhookService = new WebhookServiceAPI(this);
        this.status = new StatusAPI(this);
        this.contacts = new ContactsAPI(this);
    }
}

export default RestAPI;