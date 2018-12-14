const request = require('request');

const package = require('../package.json');

const base = `http://${process.env.URL || '127.0.0.1'}:${process.env.PORT || 4000}/employee`;

const logger = require('../log4js').logger;
const models = require('../models');

describe('Employee Test Suite', () => {

  it('Get all employees', (done) => {
    request.get(base, function (error, response, body) {
      expect(response.statusCode).toBe(200);
      const data = JSON.parse(body);
      expect(data.length).toBe(10);
      return done();
    });
  });

  it('Get an employee not found', (done) => {
    request.get(base + '/200', function (error, response, body) {
      expect(response.statusCode).toBe(404);
      return done();
    });
  });

  it('Get an employee', (done) => {
    request.get(base + '/2', function (error, response, body) {
      expect(response.statusCode).toBe(200);
      const data = JSON.parse(body);
      expect(data.firstName).toBe('Curt');
      return done();
    });
  });

  it('Get an employee doesnt exist', (done) => {

    request.get(base + '/200', function (error, response, body) {
      expect(response.statusCode).toBe(404);
      return done();
    });
  });

  it('Create a employee', (done) => {
    const data = {url: base, method: 'POST', json: {employee: {firstName: "John", lastName: "Wayne"}}};
    request(data, function (error, response, body) {
      expect(response.statusCode).toBe(200);
      return done();
    });
  });

  it('Update a employee', (done) => {
    const data = {url: base + '/5', method: 'PUT', json: {data: {id: "5", firstName: "Mike", lastName: "Wayne"}}};
    request(data, function (error, response, body) {

      expect(response.statusCode).toBe(200);

      return done();
    });
  });

  it('Delete a employee', (done) => {
    const data = {url: base + '/11', method: 'DELETE'};
    request(data, function (error, response, body) {
      expect(response.statusCode).toBe(200);
      return done();
    });
  });
});