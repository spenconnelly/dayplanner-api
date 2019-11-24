const express = require('express');
const app = express();
const router = express.Router();

app.use('/api/v1', router);

router.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(8080, () => {
    console.log('Listening on port 8080!');
});
