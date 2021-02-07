const getGeoLocation = require('./get-location');
const pickClosestStore = require('./find-store');
const { Offers, Users } = require('../../models');
const formatOrderData = require('./formay-many-emails');
const { sendEmail } = require('../global')

module.exports = async ({ offerIds, quantities, address }, { userId }) => {
    if (!userId) {
        throw new Error('not authenticted');
    }
    try {
        // offer logic
        const offers = await Offers.find({ _id: { $in: offerIds } });
        if (offers.length !== offerIds.length) throw new Error('offer not found');

        // const user = await Users.findByIdAndUpdate(userId, { $addToSet: { lastOffers: { $each: offerIds } } });
        for (let i = 0; i < offerIds.length; i++) {
            const id = offerIds[i];
            await Users.updateOne({ _id: userId }, { $push: { lastOffers: id } })
        }
        const user = await Users.findById(userId);

        // shop logic
        const coordinates = await getGeoLocation(address);
        const store = await pickClosestStore(coordinates);
        const distanceFromStore = Math.round((store.calcDistance * 10) / 1000) / 10;

        let cartItems = [];
        offers.forEach(o => cartItems.push({ offer: o }));
        quantities.forEach((q, i) => cartItems[i].quantity = q);

        // data at this point:
        // @user.name ordered @offers to the address @address, @distanceFromStore km away.

        const emailContent = formatOrderData(user, address, cartItems, distanceFromStore);
        const { email } = store;

        // email @emailContent to @email
        await sendEmail(email, 'new offer!', emailContent);
        return distanceFromStore;
    } catch(err) {
        throw err;
    }
}