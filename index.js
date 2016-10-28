'use strict';
const request = require('requestretry');

exports.handler = (event, context) => {
    console.log('Received event:', event.clickType);

    const options = {
        url: '',
        json: true,
        method:'POST',
        maxAttempts: 3,
        retryDelay: 100,
        retryStrategy: request.RetryStrategies.HTTPOrNetworkError,
        body:{
            "deviceId":event.serialNumber
        }
    };

    request(options)
        .then(response => {
            if (response.statusCode === 200) {
                console.log("sent the request. Id is:",event.serialNumber);
            } else {
                throw response.statusCode;
            }
        })
        .catch(err => {
            console.log('err is ',err);
            console.error("error sending the request. Id is:",event.serialNumber);
        });
};

