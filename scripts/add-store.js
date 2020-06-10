const mongoose = require('mongoose');
const { readline, ask, updateConsole } = require('./interface');
const storeEvents = new (require('events').EventEmitter)();
const { Stores } = require('../logic/models');
const getGeoLocation = require('../logic/app/get-location');

let address = {
    city: '',
    street: '',
    number: '',
    toString: () => `${address.number} ${address.street}, ${address.city}`
}
let coordinates = [];
let email = '';
let confirmed = false;

const askAndValidate = async field => {
    const result = await ask(`${field}: `);
    if (!result || result.trim() === '') {
        storeEvents.emit('validationError', field);
    } 
    return result;
}

mongoose.connection.once('open', async () => {
    process.stdout.write('> starting store add process...');
    email = await ask('\n\nstore email: ');

    // configure address
    process.stdout.write('store address:\n');
    address.city = await askAndValidate('city');
    address.street = await askAndValidate('street');
    address.number = await askAndValidate('number');
    updateConsole(-4, `store address: ${address.toString()}`);

    // coonfigure geo location
    process.stdout.write('\nstore location: calculating...');
    coordinates = await getGeoLocation(address) || [0, 0];
    updateConsole(0, `store location: [${coordinates[1]}, ${coordinates[0]}]`);

    confirmed = /^y|yes|ok|true/i.test(await ask('\n\nConfirm adding? (yes/no): '));
    readline.close();
})

readline.on('close', async () => {
    if (confirmed) {
        updateConsole(-1, '> adding store to database...');
        storeEvents.emit('ready');
    } else {
        process.stdout.write('\n\n> offer creation stopped\n');
        process.exit();
    }
    
})

storeEvents.on('validationError', async field => {
    address[field] = await askAndValidate(field);
})

storeEvents.on('ready', async () => {
    const doc = await Stores.create({
        email: email,
        location: { coordinates },
        city: address.city.split(',')[0].trim().toLowerCase()
    });
    process.stdout.write(`\n\n> a store created with the id of ${doc._id}`);
    process.exit();
})

mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
)
.catch(err => {
    process.stdout.write('\n > couldn\'t connect to database, please try again');
})