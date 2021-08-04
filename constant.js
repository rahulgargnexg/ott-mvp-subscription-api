const constants = {
    DYNAMO_DB_TABLES: {
        ottMvpSubscription: "ott_mvp_subscription"
    },
    STATUS_CODE: {
        SUCCESS: 200,
        CREATED: 201,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500,
        BAD_REQUEST: 400,
        FORBIDDEN: 403,
        UNAUTHORIZED: 401
    }
}
module.exports = constants;