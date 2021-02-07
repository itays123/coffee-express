const assert = require('assert');
const { connect } = require('mongoose');
const { Stores } = require('../logic/models');
const getGeoLocation = require('../logic/app/get-location');

describe('picking the closest store from a given address', () => {

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
    });

    let coordinates = [];
    it('collects the address and converts it to GeoJson', done => {
        getGeoLocation({ city: 'london', street: 'Baker st.', number: '221b' })
            .then(res => {
                coordinates = [ parseFloat(res[0]), parseFloat(res[1]) ];
                assert(2 + 3 === 5);
                done();
            })
            .catch(err => {
                console.log(err.message);
                coordinates = [0, 0];
                assert(2 + 3 === 6);
                done();
            })
    });

    it('finds the closest store', done => {
        console.log('looking for stores with these coordinates: [' + coordinates.toString() + ']');
        Stores.aggregate([
            {
                $geoNear: {
                   near: { type: "Point", coordinates},
                   spherical: true,
                   distanceField: "calcDistance"
                }
             }
        ]).then(docs => {
            assert(docs);
            const closestStore = docs[0];
            console.log(`\nstore: ${closestStore.email} at ${closestStore.city}`);
            console.log(`${Math.round((closestStore.calcDistance * 10) / 1000) / 10} km away from order address`);
            done();
        }).catch(err => {
            console.log(err.message);
            assert(2 + 3 === 6);
            done();
        })
    })

})