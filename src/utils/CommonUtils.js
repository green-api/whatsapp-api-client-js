'use strict'

class CommonUtils {
    static validateString (name, val) {
        if (!val || !CommonUtils.isString(val) )
            throw new Error(`${name} must be a String!`)
    }
    static isString(val) {
        return Object.prototype.toString.call(val) === '[object String]';
    }
    static validateInteger(name, val) {
        if(!Number.isInteger(val)) 
            throw new Error(`${name} must be an integer!`)
    }

    static validateNumber(name, val) {
        if(!val || !Number(val)) 
            throw new Error(`${name} must be a number!`)
    }

    static validateObject (name, val) {
        if(!val || Object.prototype.toString.call(val) !== '[object Object]') 
            throw new Error(`${name} must be an Object!`)
    }

    static generateMethodURL(params, method, messageId) {
        return `${params.host}/waInstance${params.idInstance}/${method}/${params.apiTokenInstance}`
    }

    static validateArray(name, val) {
        if (!val || !Array.isArray(val))
            throw new Error(`${name} must be an Array!`)
    }

}

export class Receiver {
    constructor(input) {
        this._input = input;
    }

    validate() {
        if (this.getChatId() == null && this.getPhoneNumber() == null) {
            throw new Error('Receiver must be a String formatted like 00000000000@c.us or a String formatted like 00000000000-0000000008@g.us or integer')
        }
    }

    getChatId() {
        if (CommonUtils.isString(this._input) && this._input.indexOf('@') !== -1)
            return this._input
        return null;
    }

    getPhoneNumber() {
        if (Number.isInteger(this._input))
            return this._input
        return null;
    }
}

export default CommonUtils