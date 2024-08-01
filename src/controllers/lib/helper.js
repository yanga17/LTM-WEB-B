function errorHandler(error, name, from) {
    let loggerFunction = console.log; // log functions

    loggerFunction("----------------START-------------");
    loggerFunction("Error occured in " + name);

    if (from === "axios") {
        if (error.response) {
            //The request was made and the server  responsed with a status code that falls out of range of 2xx

            loggerFunction(error.response.data);
            loggerFunction(error.response.status);
            loggerFunction(error.response.headers);
        } else if (error.request) {
            //The request was made but no response was received
            //'error.request' is an instance of XMLHttpRequest in the browser http.ClientRequest in nodejs

            loggerFunction(error.request);

        } else {
            //Something happened in setting up the request that triggered an error
            loggerFunction("Error", error.message);
        }
        //convert error to json so we can see the problem
        loggerFunction(error.toJSON());
    } else {
        loggerFunction(error);
    }

    loggerFunction("----------------END-------------");
}

module.exports = { errorHandler };