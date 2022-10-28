const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('ConverHandler Functions', function(){
        test('Read whole number',function(){
            assert.equal(convertHandler.getNum('2mi'),2,'Whole number not read');
        });
        test('Read decimal', function(){
            assert.equal(convertHandler.getNum('1.5gaL'),1.5,'Decimal Number not read');
        });
        test('Read fraction', function(){
            assert.equal(convertHandler.getNum('1/2L'),0.5,'Fractional Number not read');
        });
        test('Read decimal with fraction',function(){
            assert.equal(convertHandler.getNum('3.2/2km'),1.6,'Fractional Number with decimal not read');
        });
        test('Throw error for double fractions',function(){
            assert.Throw(()=>{convertHandler.getNum('3/1/2')},'invalid number','Error not thrown for whole number double fractions');
            assert.Throw(()=>{convertHandler.getNum('3.1/1.1/2')},'invalid number','Error not thrown for mix of decimal doublefractions');
            assert.Throw(()=>{convertHandler.getNum('3/1/2.1')},'invalid number','Error not thrown for more mix of decimal double fractions');
            assert.Throw(()=>{convertHandler.getNum('3.7/1.7/0.2')},'invalid number','Error not thrown for three decimal double fractions');
            assert.Throw(()=>{convertHandler.getNum('3/1/2.1.1')},'invalid number','Error not thrown for double decimal double fractions');
        });
        test('Throw error for double decimals',function(){
            assert.throw(()=>{convertHandler.getNum('3.1.1')},'invalid number','Error not thrown for double decimals');
            assert.throw(()=>{convertHandler.getNum('5.7.7/2')},'invalid number','Error not thrown for double decimals with fraction');
        })

    })

});