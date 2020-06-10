const { Schema, model } = require('mongoose');

const IngredientSchema = new Schema({
    name: { type: String, default: 'coffee' },
    share: { type: Number, default: 100 }
})

const OfferSchema = new Schema({
    title: { type: String, default: 'Untitled Offer' },
    ingredients: [IngredientSchema]
}, {
    timestamps: true
});

module.exports = model('offer', OfferSchema);