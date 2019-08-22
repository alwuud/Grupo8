
before(done => {
    console.log('\n\n-----------------------\n--\n-- START TEST\n--\n-------------------------');
    done();
});
after(done => {
    console.log('\n\n-----------------------\n--\n-- END TEST\n--\n-------------------------');
    done();
});
/* asyn test */
describe('#Synchronous user crud test', () => {
    describe('## get users', () => {
        it('get "users" record', done => {
            chai.request(server)
                .get('/users')
                .end(function (err, res) {
                    if (err) done(err);
                    done();
                    console.log('status code: %s, users: %s', res.statusCode, res.body.length)
                });
        }).timeout(0);
    })
    describe('## Save Users', () => {
        it('save "user" record', done => {
            chai.request(server)
                .post('/users')
                .send(user)
                .then(res => {
                    done();
                    console.log('status code: %s, user saved with id: %s', res.statusCode, res.body.insertId)
                })
                .catch(err => {
                    done(err);
                });
        }).timeout(0);
    })});