'use strict';
const dynamodb = require('../libraries/dynamoDb');
const constant = require('../constant');

class OttMvPSubscriptionModel {

    constructor(opts) {
        this.table = constant.DYNAMO_DB_TABLES.ottMvpSubscription;
    }

    //Get subscription
    async getSubscriptions(event, payload = null) {
        console.log("Function OttMvPSubscriptionModel.getSubscriptions called", event)
        try {
            const params = {
                TableName: this.table
            };
            let result;
            if (payload && payload.id) {
                params.Key = {
                    id: payload.id
                }
                result = await dynamodb.get(params).promise();
            }else{
                result = await dynamodb.scan(params).promise();
            }
            return result;
        } catch (error) {
            console.log("Error in function OttMvPSubscriptionModel.getSubscriptions called:", error)
            throw error;
        }
    }

    //createSubscription
    async createSubscription(event, requestPayload) {
        console.log("Function OttMvPSubscriptionModel.getSubscriptions called", event)
        try {
            const params = {
                TableName: this.table
            };

            await dynamodb.put({
                TableName: constant.DYNAMO_DB_TABLES.ottMvpSubscription,
                Item: requestPayload
            }).promise()

            return true;
        } catch (error) {
            console.log("Error in function OttMvPSubscriptionModel.getSubscriptions:", error)
            throw error;
        }
    }

    //updateSubscription
    async updateSubscription(event, requestPayload, id) {
        console.log("Function OttMvPSubscriptionModel.updateSubscription called", event)
        try {
            const params = {
                Key: {
                    id: id
                },
                TableName: this.table,
                ConditionExpression: 'attribute_exists(id)',
                UpdateExpression: 'SET subscription_name = :subscription_name, subscription_identifier = :subscription_identifier, subscription_multiplier = :subscription_multiplier,subscription_description = :subscription_description, subscription_billing_frequency = :subscription_billing_frequency, subscription_recurring = :subscription_recurring, subscription_countries = :subscription_countries, subscription_acceptable_offers = :subscription_acceptable_offers, subscription_schedule_from = :subscription_schedule_from, subscription_schedule_to = :subscription_schedule_to, subscription_is_never = :subscription_is_never',
                ExpressionAttributeValues: {
                    ':subscription_name': requestPayload.subscription_name,
                    ':subscription_identifier': requestPayload.subscription_identifier,
                    ':subscription_multiplier': requestPayload.subscription_multiplier,
                    ':subscription_identifier': requestPayload.subscription_identifier,
                    ':subscription_description': requestPayload.subscription_description,
                    ':subscription_billing_frequency': requestPayload.subscription_billing_frequency,
                    ':subscription_recurring': requestPayload.subscription_recurring,
                    ':subscription_countries': requestPayload.subscription_countries,
                    ':subscription_acceptable_offers': requestPayload.subscription_acceptable_offers,
                    ':subscription_schedule_from': requestPayload.subscription_schedule_from,
                    ':subscription_schedule_to': requestPayload.subscription_schedule_to,
                    ':subscription_is_never': requestPayload.subscription_is_never
                },
                ReturnValues: 'ALL_NEW'
            };
            const isUpdate = await dynamodb.update(params).promise();

            return true;
        } catch (error) {
            console.log("Error in function OttMvPSubscriptionModel.updateSubscription:", error)
            throw error;
        }
    }
}
module.exports = OttMvPSubscriptionModel