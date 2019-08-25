
before(done => {
    console.log('\n\n-----------------------\n--\n-- START TEST\n--\n-------------------------');
    done();
});
after(done => {
    console.log('\n\n-----------------------\n--\n-- END TEST\n--\n-------------------------');
    done();
});
/* asyn test */
var assert = require('assert');
 
describe('Registro de proveedor', function() {
  describe('#registry()', function() {
 
    it('Exito', function() {
      assert.equal([1,2,3].indexOf(3), 2);
    });
  });
});

describe('Visualizar horario', function() {
  describe('#client(id)', function() {
 
    it('Exito', function() {
      assert.equal([1,2,3].indexOf(3), 2);
    });
  });
});

describe('Ingresar Horario', function() {
  describe('#horario()', function() {
 
    it('Exito', function() {
      assert.equal([1,2,3].indexOf(3), 2);
    });
  });
});

describe('Agendar Horarios', function() {
  describe('#schedule()', function() {
 
    it('Exito', function() {
      assert.equal([1,2,3].indexOf(3), 2);
    });
  });
});

describe('Visualizar SOlicitudes', function() {
  describe('#solicitud(id)', function() {
 
    it('Exito', function() {
      assert.equal([1,2,3].indexOf(3), 2);
    });
  });
});

describe('Aceptar Solicitud', function() {
  describe('#a_solicitud(id)', function() {

    it('Exito', function() {
      assert.equal([1,2,3].indexOf(3), 2);
    });
  });
});