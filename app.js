const express = require('express');

const app = express();

app.use(require('./routes'));

// start the server
app.listen(8080, () => {
    console.log('Listening on port 8080!');
});
