const users = [
    { id: "1", email: "eeee@hotmail.com", phone: "3111234567", isVerified: false },
    { id: "2", email: "Rod@hotmail.com", phone: "3117654321", isVerified: false },
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const sgMail = require('@sendgrid/mail');

const getAllUsers = () => users;
const getUserById = (id) => users.find(user => user.id === id);
const registerUser = (email, phone) => {
    if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
    }
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const newUser = { id: (users.length + 1).toString(), email, phone, isVerified: false };
    
    //Whatsapp Twilio

    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            from: 'whatsapp:+14155238886',
            contentSid: '',
            contentVariables: '{"1":"409173"}',
            to: 'whatsapp:+5213112853405'
        })
        .then(message => console.log(message.sid))
        .done();
    //---------------------
    const msg = {
        to: email,
        from: FROM_EMAIL,
        subject: 'Tu código de verificación',
        text: `Tu código de verificación es: ${verificationCode}`,
    };
    await sgMail.send(msg);

    users.push(newUser);
    return newUser;
}

const verifyCode = (email, code) => {
    const user = users.find(user => user.email === email);
    if (!user) return null;
    if (user.isVerified) return null;
    if (user.verificationCode !== code) return null;
    user.isVerified = true;
    delete user.verificationCode;
    return user;
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