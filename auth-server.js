const express = require('express');
const { Issuer, generators } = require('openid-client');

const app = express();
app.use(express.json());

let clients = [];

app.post('/register', (req, res) => {
    const client = {
        client_id: generators.uid(),
        client_secret: generators.secret(),
        redirect_uris: req.body.redirect_uris,
    };
    clients.push(client);
    res.json(client);
});

app.listen(3000, () => {
    console.log('Authentication Server listening on port 3000');
});