const getUserByEmail = require('./get-user');
const { compareSync } = require('bcrypt-nodejs');
const { sign } = require('jsonwebtoken');
const { mapUser } = require('../global');

module.exports = async ({ email, password }) => {
    try {
        const user = await getUserByEmail(email);
        if (!user.email) throw new Error('this user doesn\'t exist');
        const isPasswordCorrect = compareSync(password, user.password);
        if (isPasswordCorrect) {
            const token = sign({ userId: user._id }, process.env.AUTH_TOKEN || '1234');
            return ({
                user: mapUser(user),
                token: token
            })
        } else {
            throw new Error('incorrect password');
        }
    } catch (err) {
        throw err;
    }
}