const express = require('express');
const app = express();
const { connect } = require('mongoose');

app.use(require('body-parser').json());
app.use(require('./server/middleware/cors'));
app.use(require('./server/middleware/check-auth'));
app.use('/api', require('./server/middleware/graphQL'));

connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
).then(() => {
    console.log(`> connected to database`);
    app.listen(8000);
}).catch(() => {
    console.log('> a 500-code error accured on start, please fix');
})
