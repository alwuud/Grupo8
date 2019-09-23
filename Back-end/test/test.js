//TDD
const app = require('../app');
const expect = require('expect');
const request = require('supertest');
before(done => {
    console.log('\n\n-----------------------\n--\n-- START TEST\n--\n-------------------------');
    done();
});
after(done => {
    console.log('\n\n-----------------------\n--\n-- END TEST\n--\n-------------------------');
    done();
});
describe('test-proveedor',function(){
    it('Creando nuevo proveedor ', (done)=>{
            send({
                username: 'nuevo',
                pass : '1234',
                email : 'nuevo@gmail.com',
                nombres : 'hola',
                apellidos : 'nesd'
            })
            .end(done)
    });
    it('error no se pudo crear nuevo proveedor', (done) =>{
        request(app)
        .post('/proveedor/registry')
        .send({})
        .expect(400)
        .end((err,res)=>{
            return done(err);
        });
    });

});

describe ("mod_historia",function(){
    it("should get current user citas", function(done){
        request(app).get('/client/cita/logged')
        .expect(200,done)
    })
    it("should posts a new schedule and deltes previous one", function(done){
        request(app).post('/cliente/mod_schedule')
        .send({current_sch:1,next_sch:2})
        .expect(302)
        .expect('Updated succesfully',done)
    })
})