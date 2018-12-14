const request = require('request');

const package = require('../package.json');

const base = `http://${process.env.URL || '127.0.0.1'}:${process.env.PORT || 4000}/`;

describe('Home', () => {
  it('should be reachable', (done) => {
    request.get(base, function(error, response, body) {
      expect(response.statusCode).toBe(200);
      
      const data = JSON.parse(body);
      expect(data.name).toBe(package.name);
      expect(data.version).toBe(package.version);
      expect(data.description).toBe(package.description);

      return done();
    });
  });
});