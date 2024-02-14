const express = require('express');
const { generators } = require('openid-client');

const app = express();
app.use(express.json());

const validateAccessToken = (req, res, next) => {
    const isValid = true;

    if (isValid) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

app.get('/secured-endpoint', validateAccessToken, (req, res) => {
    res.json({ message: 'This is a secured endpoint' });
});

app.listen(5000, () => {
    console.log('API Server listening on port 5000');
});