const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Address {
    city: String!
    street: String!
    number: String!
    apartment: String
}

input AddressInput {
    city: String
    street: String
    number: String
    apartment: String
}

type User {
    id: ID!
    name: String
    email: String!
    password: String
    address: Address
    lastOffers: [ID!]!
}

type AuthData {
    token: String!
    user: User!
}

type Ingredient {
    id: ID
    name: String!
    share: Int!
}

type Offer {
    id: ID!
    title: String!
    ingrediants: [Ingredient!]!
    createdAt: String!
}

type RootQuery {
    login(email: String!, password: String!): AuthData!
    contact(rating: Int!, review: String, name: String): String
    offers: [Offer!]!
    forgotPassword(email: String!): String
}

type RootMutation {
    signup(email: String!, password: String!, name: String, address: AddressInput): AuthData!
    configName(name: String!): User
    changePassword(password: String!): User
    changeAddress(address: AddressInput): User
    order(offerId: ID!, address: AddressInput): String
    orderMany(offerIds: [ID!]!, quantities: [Int!]!, address: AddressInput): Float
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)