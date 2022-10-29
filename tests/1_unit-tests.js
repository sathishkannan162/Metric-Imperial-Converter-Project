const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Get Number from String', function(){
        test('Read whole number',function(){
            assert.strictEqual(convertHandler.getNum('2mi'),2,'Whole number not read');
        });
        test('Read decimal', function(){
            assert.strictEqual(convertHandler.getNum('1.5gaL'),1.5,'Decimal Number not read');
        });
        test('Read fraction', function(){
            assert.strictEqual(convertHandler.getNum('1/2L'),0.5,'Fractional Number not read');
        });
        test('Read decimal with fraction',function(){
            assert.strictEqual(convertHandler.getNum('3.2/2km'),1.6,'Fractional Number with decimal not read');
        });
        test('Empty number gives default 1',function(){
            assert.strictEqual(convertHandler.getNum('L'),1,'Default value is 1');
            assert.strictEqual(convertHandler.getNum('mi'),1,'Default value is 1');
            assert.strictEqual(convertHandler.getNum('gaL'),1,'Default value is 1');
            assert.strictEqual(convertHandler.getNum('km'),1,'Default value is 1');

        });
        test('Throw error for double fractions',function(){
            assert.Throw(()=>{convertHandler.getNum('3/1/2km')},'invalid number','Error not thrown for whole number double fractions');
            assert.Throw(()=>{convertHandler.getNum('3.1/1.1/2mi')},'invalid number','Error not thrown for mix of decimal doublefractions');
            assert.Throw(()=>{convertHandler.getNum('3/1/2.1l')},'invalid number','Error not thrown for more mix of decimal double fractions');
            assert.Throw(()=>{convertHandler.getNum('3.7/1.7/0.2L')},'invalid number','Error not thrown for three decimal double fractions');
            assert.Throw(()=>{convertHandler.getNum('3/1/2.1.1lbs')},'invalid number','Error not thrown for double decimal double fractions');
        });
        test('Throw error for double decimals',function(){
            assert.throw(()=>{convertHandler.getNum('3.1.1Lbs')},'invalid number','Error not thrown for double decimals');
            assert.throw(()=>{convertHandler.getNum('5.7.7/2gal')},'invalid number','Error not thrown for double decimals with fraction');
        });
    });
    suite("Get unit From String",function(){
        const unitRegex = /gal|L|km|mi|lbs|kg/;
        test("Get valid unit from each unit", function(){
            assert.match(convertHandler.getUnit('2mi'),unitRegex);
            assert.match(convertHandler.getUnit('3.2gaL'),unitRegex);
            assert.match(convertHandler.getUnit('3/2LBS'),unitRegex);
            assert.match(convertHandler.getUnit('3.1.1Km'),unitRegex);
            assert.match(convertHandler.getUnit('5/2/2l'),unitRegex);
            assert.match(convertHandler.getUnit('5.2.2KG'),unitRegex);
        });
        test("Throw Invalid unit",function(){
            assert.throw(()=>{convertHandler.getUnit("3.2a")},"invalid unit","Error invalid unit should be thrown for invalid units");
            assert.throw(()=>{convertHandler.getUnit("3.2 lbs")},"invalid unit","Error invalid unit should be thrown for invalid units");
            assert.throw(()=>{convertHandler.getUnit("3.2 *lkd")},"invalid unit","Error invalid unit should be thrown for invalid units");
            assert.throw(()=>{convertHandler.getUnit("3.2 123")},"invalid unit","Error invalid unit should be thrown for invalid units");
            assert.throw(()=>{convertHandler.getUnit("3.2 3/2")},"invalid unit","Error invalid unit should be thrown for invalid units");
        });
    })


});
