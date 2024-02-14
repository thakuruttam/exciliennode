const express = require('express');
const { generators } = require('openid-client');

const app = express();
app.use(express.json());

let refreshTokens = [];

app.post('/token', (req, res) => {
    const refreshToken = generators.uid();
    refreshTokens.push(refreshToken);

    const accessToken = generators.uid();
    res.json({ access_token: accessToken, refresh_token: refreshToken });
});

app.post('/refresh', (req, res) => {
    const oldRefreshToken = req.body.refresh_token;
    if (refreshTokens.includes(oldRefreshToken)) {
        refreshTokens = refreshTokens.filter(token => token !== oldRefreshToken);

        const newRefreshToken = generators.uid();
        refreshTokens.push(newRefreshToken);

        const newAccessToken = generators.uid();
        res.json({ access_token: newAccessToken, refresh_token: newRefreshToken });
    } else {
        res.status(401).json({ error: 'Invalid refresh token' });
    }
});

app.listen(6000, () => {
    console.log('Token Rotation Server listening on port 6000');
});