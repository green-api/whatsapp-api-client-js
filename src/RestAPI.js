'use strict'

import MessageAPI from './utils/MessageAPI.js'
import FileAPI from './utils/FileAPI.js'
import InstanceAPI from './utils/InstanceAPI.js';
import SettingsAPI from './utils/SettingsAPI.js';
import GroupAPI from './utils/GroupAPI.js';

class RestAPI {

    constructor (params) {
        this.params = {
            host: '',
            idInstance: '',
            apiTokenInstance: '',
        };
        Object.assign(this.params, params);

        this.message = new MessageAPI(this);
        this.file = new FileAPI(this);
        this.instance = new InstanceAPI(this);
        this.settings = new SettingsAPI(this);
        this.group = new GroupAPI(this);
    }
}

export default RestAPI;