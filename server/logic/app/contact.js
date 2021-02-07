const Stats = require('../../models/stats');
const { sendEmail } = require('../global');

module.exports = async ({ rating, review, name }) => {
    if (!name || name === '') name = 'Untitled Review';
    if (!review || review === '') review = 'Empty Review';

    // add rating to stats in the database
    let peopleRated = 0, currRating = 1;
    const currStats = await Stats.findById('5ede85b95967d8eeafd1e343');
    if (currStats.rating) {
        peopleRated = currStats.rating.peopleRated;
        currRating = currStats.rating.ratingAvg;
    }

    const newRating = ( (peopleRated * currRating) + rating ) / ( peopleRated + 1 );
    await Stats.findByIdAndUpdate('5ede85b95967d8eeafd1e343', { $set: {
        rating: {
            ratingAvg: newRating,
            peopleRated: peopleRated + 1
        }
    } }, { upsert: true });

    // email our worker the review
    await sendEmail('coffee.express.server@gmail.com', `new review by ${name}`, `
you have a new review: 
${review}

current average rating is ${newRating}

`)

    return 'message recieved';
}