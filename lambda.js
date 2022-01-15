'use strict'

/* Have to be async with promise, local mode doesn't support callback */
/* We can wrapp legacy callback code under promise */
const apiHandler = async (payload, context, callback) => {
    console.log(`Function apiHandler called with payload ${JSON.stringify(payload)}`);
    const promise = new Promise(function(resolve, reject) {
        resolve({
            statusCode: 201,
            body: JSON.stringify({
                message: 'Hello World'
            }),
            headers: {
                'X-Custom-Header': 'ASDF'
            }
        })
    })
    return promise
}
    
module.exports = {
    apiHandler,
}