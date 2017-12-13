require('dotenv').config();

var request = require('request');
var express = require('express')
var path = require('path')
var utils = require('./utils.js');

var DIST_DIR = path.join(__dirname, '../client/build');
var PORT = 8000;

console.log('Starting server...');
var app = express()

// Serve files in build
app.use(express.static(DIST_DIR));

const RIOT_API_KEY = process.env.RIOT_API_KEY;

// RIOT api
// get user info using a summonerName
app.get('/api/user/:summonerName', (req, res) => {
    const summonerName = utils.getParam(req, 'summonerName');
    if (!summonerName) {
        res.end();
        return;
    }
    var apiReq = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + summonerName + '?api_key=' + RIOT_API_KEY;
    request(apiReq, function (error, response, body) {
        if (error) {
            console.log('error:', error);
            res.end();
            return;
        }
        console.log('statusCode:', response && response.statusCode);
        res.json(JSON.parse(body));
    });
})

// get live game info using a summonerId
app.get('/api/live/:summonerId', (req, res) => {
    const summonerId = utils.getParam(req, 'summonerId');
    if (!summonerId) {
        res.end();
        return;
    }
    var apiReq = 'https://na1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/' + summonerId + '?api_key=' + RIOT_API_KEY;
    request(apiReq, function (error, response, body) {
        if (error) {
            console.log('error:', error);
            res.end();
            return;
        }
        console.log('statusCode:', response && response.statusCode);
        res.json(JSON.parse(body));
    });
})

// get past 20 matches, access matches array and go through each gameId in the array
app.get('/api/matchlists/:accountId', (req, res) => {
    const accountId = utils.getParam(req, 'accountId');
    if (!accountId) {
        res.end();
        return;
    }
    var apiReq = 'https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/' + accountId + '/recent?api_key=' + RIOT_API_KEY;
    request(apiReq, function (error, response, body) {
        if (error) {
            console.log('error:', error);
            res.end();
            return;
        }
        console.log('statusCode:', response && response.statusCode);
        res.json(JSON.parse(body));
    });
})

// TODO: get match info by matchId (gameId)
// /lol/match/v3/matches/{matchId}

// React Router redirect
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
})

var server = app.listen(PORT, function (error) {
    if (error) {
        console.log(error);
    }
    console.log('Listening on port ' + PORT);
})

module.exports = server;