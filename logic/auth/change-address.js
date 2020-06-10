const { Users } = require('../models');
const { mapUser } = require('../global');

module.exports = async ({ address }, { userId }) => {
    if (!userId) {
        throw new Error('you are not authenticated');
    }
    try {
        const doc = await Users.findByIdAndUpdate(userId, { $set: { address: address } }, { upsert: true });
        return mapUser(doc);
    } catch (err) {
        throw err;
    }
}