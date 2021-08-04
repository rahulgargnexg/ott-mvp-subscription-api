'use strict';
const constants = require("../constant");
const responseLib = require('../libraries/responseLib');
const createSubscriptionValidate = async (event) => {
    const reqBody = JSON.parse(event.body);
    console.log("reqBody", reqBody);

    if (!reqBody) {
        return responseLib.response(constants.STATUS_CODE.BAD_REQUEST,"Request payload cann't be empty");
    }
    if (reqBody && !reqBody.subscriptionName) {
        return responseLib.response(constants.STATUS_CODE.BAD_REQUEST,"Please enter subscription name");
    }
    if (reqBody && !reqBody.subscriptionIdentifier) {
        return responseLib.response(constants.STATUS_CODE.BAD_REQUEST,"Please enter identifier");
    }
    if (reqBody && !reqBody.subscriptionMultiplier) {
        return responseLib.response(constants.STATUS_CODE.BAD_REQUEST,"Please enter multiplier");
    }
    if (reqBody && !reqBody.subscriptionDescription) {
        return responseLib.response(constants.STATUS_CODE.BAD_REQUEST,"Please enter description");
    }
    if (reqBody && !reqBody.subscriptionBillingFrequency) {
        return responseLib.response(constants.STATUS_CODE.BAD_REQUEST,"Please enter billing frequency");
    }
    if (reqBody && !reqBody.subscriptionCountries) {
        return responseLib.response(constants.STATUS_CODE.BAD_REQUEST,"Please add country/plan details");
    }
    
    return {
        reqBody: reqBody
    }
}
module.exports = {
    createSubscriptionValidate
}