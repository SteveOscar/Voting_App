const assert = require('assert');
const app = require('../server');
const request = require('request');

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

describe('Server', () => {

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

    // it('should have a body with the name of the application', (done) => {
    //   var title = app.locals.title;
    //
    //   this.request.get('/', (error, response) => {
    //     if (error) { done(error); }
    //     assert(response.body.includes(title),
    //            `"${response.body}" does not include "${title}".`);
    //     done();
    //   });
    // });
  });

});
