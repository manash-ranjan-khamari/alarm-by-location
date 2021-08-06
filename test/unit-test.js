const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const config = require('../config/appconfig.js');
chai.use(chaiAsPromised);

const expect = chai.expect;
const baseUrl = config.appUrl;

describe('/api', function() {
    
    before(function(beforeDone) {
        beforeDone();
    });
    
    describe('GET /api/events', function() {
        before(function(beforeDone) {
            url = '/api/events';
            beforeDone();
        });

        it('Should return bad request when invalid start datetime is specified', function(done) {
            request(baseUrl).get(`${url}/1/?startTime=TEST`)
                .expect('Content-type', /json/).expect(400).end(function(err, res) {
                    expect(res.body).to.be.a('object');
                    
                    expect(res.body).to.have.property('errors').to.be.an('array').to.have.property(0).to.be.a('object');
                    expect(res.body).to.have.property('errors').to.have.property(0).to.have.property('field')
                        .and.equal('startTime');
                    expect(res.body).to.have.property('errors').to.have.property(0).to.have.property('message')
                        .and.equal('must be a valid datetime in the format YYYY-MM-DD HH:MM:SS');


                    done();
                });
        });

        it('Should return bad request when invalid page param is specified', function(done) {
            request(baseUrl).get(`${url}/1/?page=TEST`)
                .expect('Content-type', /json/).expect(400).end(function(err, res) {
                    expect(res.body).to.be.a('object');
                    
                    expect(res.body).to.have.property('errors').to.be.an('array').to.have.property(0).to.be.a('object');
                    expect(res.body).to.have.property('errors').to.have.property(0).to.have.property('field')
                        .and.equal('page');
                    expect(res.body).to.have.property('errors').to.have.property(0).to.have.property('message')
                        .and.equal('must be an integer value');


                    done();
                });
        });

    });
});
