const { Schema, model } = require('mongoose');

const GeoSchema = new Schema({
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], default: [0, 0] }
});

const StoreSchema = new Schema({
    city: { type: String, required: true },
    location: GeoSchema,
    email: { type: String, required: true }
})
StoreSchema.index({ location: '2dsphere' });

const Stores = model('store', StoreSchema);

module.exports = Stores;
