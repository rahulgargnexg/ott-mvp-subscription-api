'use strict';
const response = (statusCode, messageBody, isStringify = true) => {
    return {
        statusCode: statusCode,
        body: (isStringify) ? JSON.stringify(messageBody) : messageBody
    }
}

module.exports={
    response 
}