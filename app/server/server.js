require('dotenv').config();

var express = require('express')
var path = require('path')
var request = require('request');

var DIST_DIR = path.join(__dirname, '../client/build');
var PORT = 8000;

console.log('Starting server...');
var app = express()

// Serve files in build
app.use(express.static(DIST_DIR));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
})

const RIOT_API_KEY = process.env.RIOT_API_KEY;

// RIOT api
// /api/user?name=lali
app.get('/api/user', function (req, res) {
    const name = req.query.name;
    if (name == null || name.length == 0) {
        res.end();
        return;
    }

    var apiReq = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + name + '?api_key=' + RIOT_API_KEY;

    request(apiReq, function (error, response, body) {
        if (error) {
            console.log('error:', error);
            res.end();
            return;
        }
        console.log('statusCode:', response && response.statusCode);
        res.send(body)
    });
})

var server = app.listen(PORT, function (error) {
    if (error) {
        console.log(error);
    }
    console.log('Listening on port ' + PORT);
})

