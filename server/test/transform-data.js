const { Offers } = require('../logic/models');
const findStore = require('../logic/app/find-store');
const getGeoLocation = require('../logic/app/get-location');
const formatEmailData = require('../logic/app/format-email');
const assert = require('assert');
const { connect } = require('mongoose');

describe('formats order data into emailable string', () => {
    let offer;
    let store;
    const address = {
        city: 'new york, NY',
        street: 'w 65 st',
        number: 22
    };

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

    it('collect the closest store the a given address', done => {
        getGeoLocation(address)
        .then(coor => findStore(coor))
        .then(res => { 
            store = res;
            console.log(`store found ${store.calcDistance} meters away`)
            assert(store.calcDistance);
            done();
        })
        .catch(err => {
            console.log(err.message);
            assert(2 + 3 === 6);
            store = {
                calcDistance: 'not found'
            }
            done();
        })
    })

    it('finds the offer', done => {
        Offers.findById('5ed285d4059aa727083d2889')
        .then(res => {
            offer = res;
            console.log(`offer found with the title of ${offer.title}`);
            assert(offer.title);
            done();
        })
        .catch(err => {
            console.log(err.message);
            assert(2 + 3 === 6);
            offer = {
                title: 'not found',
                ingredients: []
            }
            done();
        })
    })

    it('formats the data', done => {
        if (!store || !offer) {
            assert(2 + 3 === 6);
            done();
            return;
        }
        const data = formatEmailData({ name: 'test' }, address, offer, store);
        console.log(data);
        assert(data);
        done();
    })

})