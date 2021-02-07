module.exports = user => ({
    id: user._id,
    name: user.name,
    email: user.email,
    address: user.address,
    lastOffers: user.lastOffers || []
})