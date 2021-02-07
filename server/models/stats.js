const { Schema, model } = require('mongoose');

const RatingSchema = new Schema({
    peopleRated: { type: Number, default: 0 },
    ratingAvg: { type: Number }
})

const StatsSchema = new Schema({
    rating: RatingSchema
});

module.exports = model('stat', StatsSchema);