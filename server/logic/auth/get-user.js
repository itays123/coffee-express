const { Users } = require('../../models');

module.exports = async email => {
    try {
        const user = await Users.findOne({ email: email });
        console.log(user.lastOffers);
        return user;
    } catch (err) {
        throw err;
    }
}