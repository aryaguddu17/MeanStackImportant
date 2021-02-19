'use strict';

const config = {
    local: {
        port: 8080,
        mongoDBUrl: "mongodb+srv://abhishek:fM9P06QaC9pq6hoH@cluster0-rfd5b.mongodb.net/TODO?retryWrites=true&w=majority"
    }
}

module.exports.get = function get(env) {
    return config[env] || config.default;
}