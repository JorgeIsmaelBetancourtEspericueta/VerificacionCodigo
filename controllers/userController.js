const userModel = require('../models/userModelFB');
const resolvers = {
    Query: {
        getUsers: () => userModel.getAllUsers(),
        getUser: () => (_, { id }) => userModel.getUserById(id),
    },
    Mutation: {
        createUser: (_, { name, email }) => userModel.create(name, email),
        updateUser: (_, { id, name, email }) => userModel.update(id, name, email),
        deleteUser: (_, { id }) => userModel.remove(id),
    },
}

module.exports = resolvers;