'use strict';
const uuid = require('uuid/v4');
const constants = require("../constant");
const ottMvpSubscriptionModel = require('../models/ottMvpSubscriptionModel');
const responseLib = require('../libraries/responseLib');

//getSubscription
const getSubscription = async (event, requestPayload = null) => {
    console.log("Function subscriptionService.getSubscription called", requestPayload)
    try {
        const OttMvPSubscriptionModelObj = new ottMvpSubscriptionModel();
        const payload = {};
        if (event && event.pathParameters && event.pathParameters.id) {
            payload.id = event.pathParameters.id
        }
        const subscriptionList = await OttMvPSubscriptionModelObj.getSubscriptions(event, payload);
        if (subscriptionList && subscriptionList.Items && subscriptionList.Items.length) {
            return responseLib.response(constants.STATUS_CODE.SUCCESS, subscriptionList.Items);
        } else if (subscriptionList && subscriptionList.Item) {
            return responseLib.response(constants.STATUS_CODE.SUCCESS, subscriptionList.Item);
        } else {
            return responseLib.response(constants.STATUS_CODE.SUCCESS, "No subscription found");
        }
    } catch (error) {
        console.log("Error in function subscriptionService.getSubscription:", error)
        throw error;
    }
}

//createSubscription
const createSubscription = async (event, requestPayload) => {
    console.log("Function subscriptionService.createSubscription called", requestPayload)
    try {
        const payload = {
            id: uuid(),
            subscription_name: requestPayload.subscriptionName,
            subscription_identifier: requestPayload.subscriptionIdentifier,
            subscription_multiplier: requestPayload.subscriptionMultiplier,
            subscription_description: requestPayload.subscriptionDescription,
            subscription_billing_frequency: requestPayload.subscriptionBillingFrequency,
            subscription_recurring: requestPayload.subscriptionRecurring,
            subscription_countries: requestPayload.subscriptionCountries,
            subscription_acceptable_offers: requestPayload.subscriptionAcceptableOffers,
            subscription_schedule_from: requestPayload.subscriptionScheduleFrom,
            subscription_schedule_to: requestPayload.subscriptionScheduleTo,
            subscription_is_never: requestPayload.subscriptionIsNever
        };

        const OttMvPSubscriptionModelObj = new ottMvpSubscriptionModel();
        await OttMvPSubscriptionModelObj.createSubscription(event, payload);

        return responseLib.response(constants.STATUS_CODE.SUCCESS, "Subscription created successfully");
    } catch (error) {
        console.log("Error in function subscriptionService.createSubscription:", error)
        throw error;
    }
}
//Update subscription
const updateSubscription = async (event, requestPayload) => {
    console.log("Function subscriptionService.updateSubscription called", requestPayload)
    try {
        const payload = {
            subscription_name: requestPayload.subscriptionName,
            subscription_identifier: requestPayload.subscriptionIdentifier,
            subscription_multiplier: requestPayload.subscriptionMultiplier,
            subscription_description: requestPayload.subscriptionDescription,
            subscription_billing_frequency: requestPayload.subscriptionBillingFrequency,
            subscription_recurring: requestPayload.subscriptionRecurring,
            subscription_countries: requestPayload.subscriptionCountries,
            subscription_acceptable_offers: requestPayload.subscriptionAcceptableOffers,
            subscription_schedule_from: requestPayload.subscriptionScheduleFrom,
            subscription_schedule_to: requestPayload.subscriptionScheduleTo,
            subscription_is_never: requestPayload.subscriptionIsNever
        };
        const id = event.pathParameters.id;
        const OttMvPSubscriptionModelObj = new ottMvpSubscriptionModel();
        await OttMvPSubscriptionModelObj.updateSubscription(event, payload, id);

        return responseLib.response(constants.STATUS_CODE.SUCCESS, "Subscription updated successfully");
    } catch (error) {
        console.log("Error in function subscriptionService.updateSubscription:", error)
        throw error;
    }
}
module.exports = {
    getSubscription,
    createSubscription,
    updateSubscription
}