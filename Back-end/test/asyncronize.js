//Para pruebas asincronicas
//Empezando pruebas unitarias
before(done => {
    console.log('\n\n-----------------------\n--\n-- START TEST\n--\n-------------------------');
    done();
});
after(done => {
    console.log('\n\n-----------------------\n--\n-- END TEST\n--\n-------------------------');
    done();
});
/* asyn test */
describe('#Asynchronous user crud test', () => {
    it('get "users" record', done => {
        chai.request(server)
            .get('/users')
            .end(function (err, res) {
                if(err) done(err);
                done();
                console.log('status code: %s, users: %s',res.statusCode, res.body.length)
            });
    }).timeout(0);
    it('get "user by id" record', done => {
        chai.request(server)
            .get('/users/1')
            .end(function (err, res) {
                if(err) done(err);
                done();
                console.log('status code: %s, user: %s',res.statusCode, util.inspect(res.body, false, null))
            });
    }).timeout(0)});