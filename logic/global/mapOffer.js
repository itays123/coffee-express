module.exports = offer => ({
    id: offer._id,
    title: offer.title,
    ingrediants: offer.ingredients || [],
    createdAt: new Date(offer.createdAt).toISOString()
})