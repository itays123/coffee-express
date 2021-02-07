const AuthResolver = require('./auth');
const AppResolver = require('./app');

module.exports = {
    ...AuthResolver,
    ...AppResolver
}