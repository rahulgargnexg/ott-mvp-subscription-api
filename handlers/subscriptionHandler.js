'use strict';
const constants = require("../constant");
const subscriptionService = require('../services/subscriptionService');
const subscriptionValidator = require('../validators/subscriptionValidator');

//Get subscription
module.exports.getSubscription = async (event) => {
    console.log("Execution started subscriptionHandler.getSubscription", event);
    try {
        const reponse = await subscriptionService.getSubscription(event);
        return reponse;
    } catch (error) {
        console.log("Error on subscriptionHandler.getSubscription", error);
        throw error;
    }
};
//Get subscription By
module.exports.getSubscriptionById = async (event) => {
    console.log("Execution started subscriptionHandler.getSubscriptionById", event);
    try {
        const reponse = await subscriptionService.getSubscription(event);
        return reponse;
    } catch (error) {
        console.log("Error on subscriptionHandler.getSubscriptionById", error);
        throw error;
    }
};
//Post subscription
module.exports.createSubscription = async (event) => {
    console.log("Execution started subscriptionHandler.createSubscription", event);
    try {

        //validate request
        const validateRequest = await subscriptionValidator.createSubscriptionValidate(event);
        if (validateRequest && validateRequest.statusCode && validateRequest.statusCode === constants.STATUS_CODE.BAD_REQUEST) {
            return validateRequest;
        }

        if (validateRequest && !validateRequest.reqBody) {
            throw new Error("reqBody is not defined on validator");
        }

        const reqBody = validateRequest.reqBody;
        const reponse = await subscriptionService.createSubscription(event, reqBody);

        console.log("Execution ended subscriptionHandler.createSubscription", event);

        return reponse;
    } catch (error) {
        console.log("Error on subscriptionHandler.createSubscription", error);
        throw error;
    }
};
//Update subscription 
module.exports.updateSubscription = async (event) => {
    console.log("Execution started subscriptionHandler.updateSubscription", event);
    try {
        //validate request
        const validateRequest = await subscriptionValidator.createSubscriptionValidate(event);
        if (validateRequest && validateRequest.statusCode && validateRequest.statusCode === constants.STATUS_CODE.BAD_REQUEST) {
            return validateRequest;
        }

        if (validateRequest && !validateRequest.reqBody) {
            throw new Error("reqBody is not defined on validator");
        }
        const reqBody = validateRequest.reqBody;
        const response = await subscriptionService.updateSubscription(event, reqBody);

        return response;
    } catch (error) {
        console.log("Error on subscriptionHandler.updateSubscription", error);
        throw error;
    }

}
