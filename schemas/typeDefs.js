const { gql } = require("apollo-server");

const typeDefs = gql`
    # Tipos principales
    type User {
        id: ID!
        email: String!
        phone: String!
        isVerified: Boolean!
    }

    type AuthCode {
        token: String
        user: User
    }

    # Mutaciones
    type Mutation {
        registerUser(email: String!, phone: String!, via: String!): User!
        verifyCode(email: String!, code: String!): AuthCode!
        login(email: String!): AuthCode!
    }
`;

module.exports = typeDefs;
