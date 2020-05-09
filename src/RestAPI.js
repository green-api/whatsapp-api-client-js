'use strict'

import MessageAPI from './utils/MessageAPI.js'
import FileAPI from './utils/FileAPI.js'

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
    }
}

export default RestAPI;