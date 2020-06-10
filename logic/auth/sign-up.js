const getUserByEmail = require('./get-user');
const encryptPassword = require('./enctypt-password');
const { Users } = require('../models');
const { mapUser } = require('../global');
const { sign } = require('jsonwebtoken');

module.exports = async ({ email, password, name, address }) => {
    try {
        const user = await getUserByEmail(email);
        if(user) throw new Error('user exists!');
        const hash = await encryptPassword(password);
        const doc = await Users.create({
            email,
            password: hash,
            name: name,
            address: address
        });
        const token = sign({ userId: doc._id }, process.env.AUTH_TOKEN || '1234');
        return ({
            token: token,
            user: mapUser(doc)
        });
    } catch (err) {
        throw err;
    }
}