var path = require('path')
var dotEnvPath = path.resolve(__dirname, '../../.env');
require('dotenv').config({ path: dotEnvPath});

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/server.js');
var should = chai.should();

chai.use(chaiHttp);

const SUMMONER_NAME = 'lali';
const SUMMONER_ID = 58122733; // summonerId of user lali
const ACCOUNT_ID = 219445372; // accountId of user lali

// aphromoo: 442232
// meteos: 390600
// c9 gun: 44989337
// c9 sneaky: 51405
const INGAME_SUMMONER_ID = 44989337;

describe('UserInfo', function() {
    it('should list a SINGLE user on /api/user/<summonerName> GET', function(done) {
        chai.request(server)
            .get('/api/user/' + SUMMONER_NAME)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                res.body.should.have.property('summonerLevel');
                done();
            });
    });
});

describe('GameInfo', function() {
    it('should return a status object with code 404 on /api/live/<summonerId> GET for a player not in game', function(done) {
        chai.request(server)
            .get('/api/live/' + SUMMONER_ID)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.status.should.have.property('status_code');
                res.body.status.status_code.should.equal(404);
                done();
            });
    });

    // This test is commented out because there is no user that is always in game for us to test
    // it('should return a info object on the game on /api/live/<summonerId> GET for a player in game', function(done) {
    //     chai.request(server)
    //         .get('/api/live/' + INGAME_SUMMONER_ID)
    //         .end(function(err, res) {
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             res.body.should.have.property('participants');
    //             done();
    //         });
    // });

    it('should return an object with info on the past 20 matches on /api/matchlists/<accountId> GET for a player', function(done) {
        chai.request(server)
            .get('/api/matchlists/' + ACCOUNT_ID)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('matches');
                res.body['matches'].should.have.lengthOf.below(21);
                res.body.should.have.property('totalGames');
                done();
            });
    });
});