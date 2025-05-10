const admin = require('firebase-admin');
const serviceAccount = require('../key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const usersCollection = db.collection('users');

const getAllUsers = async () => {
    const snapshot = await usersCollection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const getUserById = async (id) => {
    const doc = await usersCollection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
};

const create = async (name, email) => {
    if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
    }
    const newUser = { name, email };
    const docRef = await usersCollection.add(newUser);
    return { id: docRef.id, ...newUser };
};

const update = async (id, name, email) => {
    const userRef = usersCollection.doc(id);
    const doc = await userRef.get();
    if (!doc.exists) return null;

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (email !== undefined) {
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format");
        }
        updates.email = email;
    }

    await userRef.update(updates);
    return { id, ...doc.data(), ...updates };
};

const remove = async (id) => {
    const userRef = usersCollection.doc(id);
    const doc = await userRef.get();
    if (!doc.exists) return null;

    await userRef.delete();
    return { id, ...doc.data() };
};

module.exports = { getAllUsers, getUserById, create, update, remove };