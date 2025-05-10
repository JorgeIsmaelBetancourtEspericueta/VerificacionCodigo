const users = [
    { id: "1", name: "Juan", email: "eeee@hotmail.com" },
    { id: "2", name: "Rodrigo", email: "Rod@hotmail.com" },
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getAllUsers = () => users;
const getUserById = (id) => users.find(user => user.id === id);
const create = (name, email) => {
    if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
    }
    const newUser = { id: (users.length + 1).toString(), name, email };
    users.push(newUser);
    return newUser;
}
const update = (id, name, email) => {
    const user = getUserById(id);
    if (!user) return null;
    if (name !== undefined) user.name = name;
    if (email !== undefined) {
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format");
        }
        user.email = email;
    }
    return user;
}

const remove = (id) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    return users.splice(userIndex, 1)[0];
}

module.exports = { getAllUsers, getUserById, create, update, remove };