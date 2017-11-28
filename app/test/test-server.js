var path = require('path')
var dotEnvPath = path.resolve(__dirname, '../../.env');
require('dotenv').config({ path: dotEnvPath});

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/server.js');
var should = chai.should();

chai.use(chaiHttp);

describe('UserInfo', function() {
    it('should list a SINGLE user on /api/user/<name> GET', function(done) {
        chai.request(server)
            .get('/api/user/lali')
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