const getGeoLocation = require('./get-location');
const pickClosestStore = require('./find-store');
const { Offers, Users } = require('../../models');
const formatOrderData = require('./format-email');

module.exports = async ({ offerId, address }, { userId }) => {
    if (!userId) {
        throw new Error('not authenticted');
    }
    try {
        // offer logic
        const offer = await Offers.findById(offerId);
        if (!offer) throw new Error('offer not found');
        const user = await Users.findByIdAndUpdate(userId, { $push: { lastOffers: offerId } });

        // shop logic
        const coordinates = await getGeoLocation(address);
        const store = await pickClosestStore(coordinates);

        // data at this point:
        // @user.name ordered @offer.title to the address @address, @user.calcDistance meters away.
        // the ingredients are: @offer.ingredients
        const emailContent = formatOrderData(user, address, offer, store);
        const { email } = store;

        // email @emailContent to @email

        return 'your offer has been ordered'
    } catch(err) {
        throw err;
    }
}