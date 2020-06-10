const mongoose = require('mongoose');
const { readline, ask, updateConsole } = require('./interface');
const offerEvents = new (require('events').EventEmitter)();
const { Offers } = require('../logic/models');

let title = '';
let ingredients = [];
let confirmed = false;

const isIngredientValid = ({ name, share }, capacity) => (
    name && name.trim() !== '' &&
    share && !isNaN(share) && share + capacity <= 100
)

mongoose.connection.once('open', async () => {
    process.stdout.write('\n\n> starting add offer process');
    title = await ask('\nname your offer: ');
    let capacity = 0;
    while (capacity < 100) {
        process.stdout.write(`\ningredient number ${ ingredients.length + 1 }:`);
        const ingredientName = await ask('\ningredient name: ');
        const ingredientShare = await ask('share from cup (%): ');
        const ingredient = { name: ingredientName, share: Number(ingredientShare) };
        if (isIngredientValid(ingredient, capacity)) {
            updateConsole(-3, `ingredient number ${ ingredients.length + 1 }: ${ingredientName} (${ingredientShare}%)`);
            ingredients.push(ingredient);
            capacity += Number(ingredientShare);
        } else updateConsole(-3, 'invalid ingredient, try again');
    }
    confirmed = /^y|yes|ok|true/i.test(await ask('\n\nConfirm adding? (yes/no): '));
    readline.close();
})

readline.on('close', async () => {
    if (confirmed) {
        offerEvents.emit('ready');
        updateConsole(-1, '> adding offer to database');
    } else { 
        process.stdout.write('\n\n> offer creation stopped\n');
        process.exit();
    }
})

offerEvents.on('ready', async () => {
    const offer = {};
    offer.title = title.trim() === '' ? 'Untitled Offer' : title;
    offer.ingredients = ingredients; 
    try {
        const doc = await Offers.create(offer);
        process.stdout.write(`\n\n> an offer created with the id of ${doc._id}\n`);
        process.exit();
    } catch (err) {
        offerEvents.emit('error', err);
    }
})

offerEvents.on('error', err => {
    process.stdout.write('\n\n> an error accured during the saving process, please try again');
    process.stdout.write(err.message);
    process.exit();
})

mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
)
.catch(err => {
    process.stdout.write('\n > couldn\'t connect to database, please try again');
})
