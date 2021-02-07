const { Schema, model } = require('mongoose');

const AddressSchema = new Schema({
    city: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: String, required: true },
    apartment: { type: String, required: false },
});

const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: AddressSchema,
    name: { type: String, required: true },
    lastOffers: [{ type: Schema.Types.ObjectId, ref: 'offer' }]
});

module.exports = model('user', UserSchema);