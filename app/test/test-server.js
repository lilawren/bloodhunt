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

// aphromoo: 442232
// meteos: 390600
const INGAME_SUMMONER_ID = 390600;

describe('UserInfo', function() {
    it('should list a SINGLE user on /api/user/<name> GET', function(done) {
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
    it('should return a status object with code 404 on /api/live/<name> GET for a player not in game', function(done) {
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
    // it('should return a info object on the game on /api/live/<name> GET for a player in game', function(done) {
    //     chai.request(server)
    //         .get('/api/live/' + INGAME_SUMMONER_ID)
    //         .end(function(err, res) {
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             res.body.should.have.property('participants');
    //             done();
    //         });
    // });
});