const schema = require('../logic/schema');
const resolvers = require('../logic');
const graphQLMiddleware = require('express-graphql');

module.exports = graphQLMiddleware({
    graphiql: true,
    rootValue: resolvers,
    schema: schema
})