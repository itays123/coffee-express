const assert = require('assert');
const { connect } = require('mongoose');
const { Stores } = require('../logic/models');

describe('calculates the distance from my existing stores to paris', () => {

    it('connects to database', done => {
        connect(
            "mongodb+srv://itay:itays205@mycluster-afnwv.mongodb.net/coffee?retryWrites=true&w=majority",
            { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
        ).then(() => {
            assert(2 + 3 === 5);
            done()
        }).catch(() => {
            assert(2 + 3 === 6);
            done();
        })
    })

    it('checks the distance from store', done => {
        Stores.aggregate([
            {
                $geoNear: {
                   near: { type: "Point", coordinates: [ 2.3514616, 48.8566969 ] }, // paris
                   spherical: true,
                   distanceField: "calcDistance"
                }
             }
        ])
        .then(docs => {
            assert(2 + 3 === 5);
            console.log(docs.map(d => ({
                city: d.city,
                distanceFromParis: ( Math.round(d.calcDistance / 1000) )
            })))
            done();
        })
        .catch(() => {
            assert(2 + 4 === 5);
            done();
        })
    })

})