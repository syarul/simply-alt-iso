let should = require('should');
let request = require('supertest');
let route = require('./../js/routing.js');
require = require('really-need');

describe('test server routing', function() {
	var server;
	this.timeout(8000);
    before('load express server', function (){
    	server = require('../server', { bustCache: true });
    });
    
    it('responds to /', function (done) {
    	console.log('==> routing to /');
        request(server)
            .get('/')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                //console.log(res.text)
                done();
            });
    });
    it('responds to /about', function (done) {
    	console.log('==> routing to /about');
        request(server)
            .get('/about')
            .expect(200, done)
    });
    it('responds to /test', function (done) {
    	console.log('==> routing to /test');
        request(server)
            .get('/test')
            .expect(200, done)
    });
    it('404 everything else', function (done) {
        console.log('==> test 404')
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });
    //it.skip('should not show coverage info for GET /', function() {
    //    console.log('test2.jsx is not included in coverage report');
    //});
});