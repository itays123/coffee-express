const { Offers } = require('../../models');
const { mapOffer } = require('../global');

module.exports = async () => {
    try {
        const docs = await Offers.find();
        return docs.map(mapOffer);
    } catch(err) {
        console.log(err);
        throw err;
    }
}