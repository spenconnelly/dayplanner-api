const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/PlannerDB');
mongoose.set('debug', true);

app.use(require('./routes'));

// start the server
app.listen(8080, () => {
    console.log('Listening on port 8080!');
});
