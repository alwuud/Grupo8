//should go mocha code
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
 
describe('Array', function() {
  describe('#indexOf()', function() {
    it('debe retornar -1 cuando el valor no esta presente', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
 
    it('debe retornar la primera ocurrencia del valor especificado', function() {
      assert.equal([1,2,3].indexOf(3), 2);
    });
  });
});

describe('#mod_reserva()',function(){
    context('without arguments in body', function() {
        it('should return 0', function() {
          expect(mod_reserva(req,res)).to.equal(0)
        })
      })

      context('with arguments in body', function() {
        it('should return 1', function() {
          expect(mod_reserva(req, res)).to.equal(1)
        })
      })
      context('with data already taken', function() {
        it('should return 0', function() {
          expect(mod_reserva(req, res)).to.equal(0)
        })
      })
});