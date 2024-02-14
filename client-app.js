const express = require('express');
const { Issuer, generators } = require('openid-client');


const app = express();
app.use(express.json());

let client;

app.post('/login', async(req, res) => {
    const { authorizationUrl, state } = client.authorizeUrl({
        redirect_uri: req.body.redirect_uri,
    });

    res.json({ authorizationUrl, state });
});

app.post('/callback', async(req, res) => {
    const params = client.callbackParams(req);
    const tokenSet = await client.callback(req.body.redirect_uri, params, { state: req.body.state });

    res.json(tokenSet);
});

app.listen(4000, async() => {
    const issuer = await Issuer.discover('http://localhost:3000');
    client = new issuer.Client({
        client_id: process.env.client_secret,
        client_secret: 'randomsecret',
        redirect_uris: ['http://localhost:4000/callback'],
    });

    console.log('Client Application listening on port 4000');
});