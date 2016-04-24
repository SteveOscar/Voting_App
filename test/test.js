const assert = require('assert');
const app = require('../server');
const request = require('request');
const fixtures = require('./fixtures');
pry = require('pryjs');


describe('Server', () => {

  before((done) => {
    this.port = 3000;
    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done();
    });
    this.request = request.defaults({
      baseUrl: 'http://localhost:3000/'
    });
  });

  after(() => {
    this.server.close();
  });

  it('should exist', () => {
    assert(app);
  });

  describe('GET /', () => {
    it('should return a 200', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  describe('GET /poll/:id', () => {

    beforeEach(function() {
      app.locals.polls = {}
      app.locals.polls[449635] = fixtures.validPoll;
    });

    it('should not return a 404', (done) => {
      this.request.get('/poll/449635', (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });
  });

  describe('GET /poll/449635/carl', () => {

    beforeEach(function() {
      app.locals.polls = {}
      app.locals.polls[449635] = fixtures.validPoll;
    });

    it('should not return a 404', (done) => {
      this.request.get('/poll/449635', (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });
  });

});
