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

  describe('View Poll as User', () => {

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

    it('should return a page that has the title of the poll', (done) => {
      var poll = app.locals.polls[449635];

      this.request.get('/poll/449635', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes(poll.title), `"${response.body}" does not include "${poll.title}"`);
        done();
      });
    });

    it('should return a page that has the poll options', (done) => {
      var poll = app.locals.polls[449635];

      this.request.get('/poll/449635', (error, response) => {
        if(error) { done(error); }
        assert(response.body.includes(poll.options1),
               `"${response.body}" does not include "${poll.options1}".`);
         assert(response.body.includes(poll.options2),
                `"${response.body}" does not include "${poll.options2}".`);
        done();
      });
    });

    it('the poll should be open', (done) => {
      var poll = app.locals.polls[449635];

      this.request.get('/poll/449635', (error, response) => {
        if(error) { done(error); }
        assert(response.body.includes('open'),
               `"${response.body}" does not include "open".`);
        done();
      });
    });

    it('should show closed message if poll is closed', (done) => {
      var poll = app.locals.polls[449635];
      poll['status'] = 'Closed';

      this.request.get('/poll/449635', (error, response) => {
        if(error) { done(error); }
        assert(response.body.includes('open'),
               `"${response.body}" does not include "Closed".`);
        done();
      });
    });
  });

  describe('View Poll as Admin', () => {

    beforeEach(function() {
      app.locals.polls = {}
      app.locals.polls[449635] = fixtures.validPoll;
    });

    it('should not return a 404', (done) => {
      this.request.get('/polls/449635/carl', (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });

    it('should return a page that has the title of the poll', (done) => {
      var poll = app.locals.polls[449635];

      this.request.get('/polls/449635/carl', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes(poll.title), `"${response.body}" does not include "${poll.title}"`);
        done();
      });
    });

    it('the poll should be open', (done) => {
      var poll = app.locals.polls[449635];
      poll['status'] = 'open';

      this.request.get('/polls/449635/carl', (error, response) => {
        if(error) { done(error); }
        assert(response.body.includes('open'),
               `"${response.body}" does not include "open".`);
        done();
      });
    });

    it('should show closed message if poll is closed', (done) => {
      var poll = app.locals.polls[449635];

      this.request.get('/polls/449635/carl', (error, response) => {
        if(error) { done(error); }
        assert(response.body.includes('open'),
               `"${response.body}" does not include "Closed".`);
        done();
      });
    });
  });

});
