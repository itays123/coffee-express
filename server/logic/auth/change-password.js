const encryptPassword = require('./enctypt-password');
const { Users } = require('../../models');
const { mapUser } = require('../global');

module.exports = async ({ password }, { userId }) => {
    if (!userId) {
        throw new Error('you are not authenticated');
    }
    try {
        const hash = await encryptPassword(password);
        const doc = await Users.findByIdAndUpdate(userId, { $set: { password: hash } }).populate('lastOffers');
        return mapUser(doc); // map user
    } catch (err) {
        throw err;
    }
}