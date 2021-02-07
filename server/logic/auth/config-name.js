const { Users } = require('../../models');
const { mapUser } = require('../global');

module.exports = async ({ name }, { userId }) => {
    if (!userId) {
        throw new Error('you are not authenticated');
    }
    try {
        const doc = await Users.findByIdAndUpdate(userId, { $set: { name: name } });
        return mapUser(doc); // map user
    } catch (err) {
        throw err;
    }
}