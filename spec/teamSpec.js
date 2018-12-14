const request = require('request');

const package = require('../package.json');

const base = `http://${process.env.URL || '127.0.0.1'}:${process.env.PORT || 4000}/team`;

const logger = require('../log4js').logger;
const models = require('../models');

describe('Employee Test Suite', () => {

    it('Get all teams', (done) => {
        request.get(base, function(error, response, body) {
            expect(response.statusCode).toBe(200);
            const data = JSON.parse(body);
            expect(data.length).toBe(2);
            return done();
        });
    });

    it('Get team not found', (done) => {
        request.get(base + '/200', function(error, response, body) {
            expect(response.statusCode).toBe(404);
            return done();
        });
    });

    it('Get a team', (done) => {
        request.get(base + '/2', function(error, response, body) {
            expect(response.statusCode).toBe(200);
            const data = JSON.parse(body);
            expect(data.name).toBe('CurtTeam');
            return done();
        });
    });

    it('Create a team', (done) => {
        const data = { url: base, method: 'POST', json: { team: { name: "JohnTeam" } } };
        request(data, function(error, response, body) {
            expect(response.statusCode).toBe(200);
            return done();
        });
    });

    it('Update a team', (done) => {
        const data = { url: base + '/2', method: 'PUT', json: { data: { id: "2", Name: "MikeTeam" } } };
        request(data, function(error, response, body) {

            expect(response.statusCode).toBe(200);

            return done();
        });
    });

    it('Delete a team', (done) => {
        const data = { url: base + '/1', method: 'DELETE' };
        request(data, function(error, response, body) {
            expect(response.statusCode).toBe(200);
            return done();
        });
    });
});