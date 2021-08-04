'use strict';
const AWS = require("aws-sdk");
const config = {
    region: "us-east-1",
};

const dynamodb = new AWS.DynamoDB.DocumentClient(config);

module.exports = dynamodb;