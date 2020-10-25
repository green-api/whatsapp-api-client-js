'use strict'
import axios from 'axios';
import CommonUtils from './CommonUtils.js'
import SingleThreadJobScheduler from '../scheduled/SingleThreadJobScheduler.js'
import ReceiveNotificationsJob from '../scheduled/ReceiveNotificationsJob.js'

class WebhookServiceAPI {

    constructor(restAPI) {
        this._restAPI = restAPI;
        this._jobScheduler = new SingleThreadJobScheduler();
        this.noteTypes = {
            incomingMessageReceived : 'incomingMessageReceived',
            outgoingMessageStatus : 'outgoingMessageStatus',
            stateInstanceChanged : 'stateInstanceChanged',
            deviceInfo: 'deviceInfo',
        }
        this.callbackTypes = {
            onReceivingMessageText : 'onReceivingMessageText',
            onReceivingMessageImage : 'onReceivingMessageImage',
            onReceivingMessageVideo : 'onReceivingMessageVideo',
            onReceivingMessageDocument: 'onReceivingMessageDocument',
            onReceivingMessageAudio: 'onReceivingMessageAudio',
            onReceivingOutboundMessageStatus: 'onReceivingOutboundMessageStatus',
            onReceivingAccountStatus: 'onReceivingAccountStatus',
            onReceivingDeviceStatus: 'onReceivingDeviceStatus',
            onReceivingMessageTextURL: 'onReceivingMessageTextURL',
            onReceivingMessageContact: 'onReceivingMessageContact',
            onReceivingMessageLocation: 'onReceivingMessageLocation',
        }
        this._callbacks = new Map()
    }

    async receiveNotification() {
        const method = 'receiveNotification';
        const response = await axios.get(CommonUtils.generateMethodURL(this._restAPI.params, method));
        return response.data
    }

    /**
     * 
     * @param {Number} receiptId 
     */
    async deleteNotification(receiptId) {
        CommonUtils.validateInteger('receiptId', receiptId);

        const method = 'deleteNotification';
        const response = await axios.delete(`${CommonUtils.generateMethodURL(this._restAPI.params, method)}/${receiptId}`);
        return response.data
    }

    async startReceivingNotifications() {
        this._jobScheduler.initJobs([new ReceiveNotificationsJob(this)])
        this._jobScheduler.reschedule()
    }

    async stopReceivingNotifications() {
        this._jobScheduler.unschedule();
    }

    onReceivingMessageText(callback)
    {
        this._callbacks.set(this.callbackTypes.onReceivingMessageText, callback)
    }
    onReceivingMessageImage(callback)
    {
        this._callbacks.set(this.callbackTypes.onReceivingMessageImage, callback)
    }
    onReceivingMessageVideo(callback)
    {
        this._callbacks.set(this.callbackTypes.onReceivingMessageVideo, callback)
    }
    onReceivingMessageDocument(callback)
    {
        this._callbacks.set(this.callbackTypes.onReceivingMessageDocument, callback)
    }
    onReceivingMessageAudio(callback)
    {
        this._callbacks.set(this.callbackTypes.onReceivingMessageAudio, callback)
    }
    onReceivingOutboundMessageStatus(callback)
    {
        this._callbacks.set(this.callbackTypes.onReceivingOutboundMessageStatus, callback)
    }
    onReceivingAccountStatus(callback)
    {
        this._callbacks.set(this.callbackTypes.onReceivingAccountStatus, callback)
    }
    onReceivingDeviceStatus(callback)
    {
        this._callbacks.set(this.callbackTypes.onReceivingDeviceStatus, callback)
    }
    onReceivingMessageTextURL(callback)
    {
        this._callbacks.set(this.callbackTypes.onReceivingMessageTextURL, callback)
    }
    onReceivingMessageContact(callback)
    {
        this._callbacks.set(this.callbackTypes.onReceivingMessageContact, callback)
    }
    onReceivingMessageLocation(callback)
    {
        this._callbacks.set(this.callbackTypes.onReceivingMessageLocation, callback)
    }
}

export default WebhookServiceAPI;