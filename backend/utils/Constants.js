'use strict';

module.exports.API_URL = () => {
    if (process.env.NODE_ENV&&process.env.NODE_ENV!=='development'&&process.env.API_URL) {
        return process.env.API_URL
    }
    return "http://localhost:1337"
 }
