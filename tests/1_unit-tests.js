const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("convertHandler should correctly read a whole number input.", function () {
    assert.strictEqual(
      convertHandler.getNum("2mi"),
      2,
      "Whole number not read"
    );
  });
  test("convertHandler should correctly read a decimal number input.", function () {
    assert.strictEqual(
      convertHandler.getNum("1.5gaL"),
      1.5,
      "Decimal Number not read"
    );
  });
  test("convertHandler should correctly read a fractional input.", function () {
    assert.strictEqual(
      convertHandler.getNum("1/2L"),
      0.5,
      "Fractional Number not read"
    );
  });
  test("convertHandler should correctly read a fractional input with a decimal.", function () {
    assert.strictEqual(
      convertHandler.getNum("3.2/2km"),
      1.6,
      "Fractional Number with decimal not read"
    );
  });
  test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", function () {
    assert.Throw(
      () => {
        convertHandler.getNum("3/2/3km");
      },
      "invalid number",
      "Error not thrown for whole number double fractions"
    );
    assert.Throw(
      () => {
        convertHandler.getNum("3/1/2km");
      },
      "invalid number",
      "Error not thrown for whole number double fractions"
    );
    assert.Throw(
      () => {
        convertHandler.getNum("3.1/1.1/2mi");
      },
      "invalid number",
      "Error not thrown for mix of decimal doublefractions"
    );
    assert.Throw(
      () => {
        convertHandler.getNum("3/1/2.1l");
      },
      "invalid number",
      "Error not thrown for more mix of decimal double fractions"
    );
    assert.Throw(
      () => {
        convertHandler.getNum("3.7/1.7/0.2L");
      },
      "invalid number",
      "Error not thrown for three decimal double fractions"
    );
    assert.Throw(
      () => {
        convertHandler.getNum("3/1/2.1.1lbs");
      },
      "invalid number",
      "Error not thrown for double decimal double fractions"
    );
  });
  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", function () {
    assert.strictEqual(convertHandler.getNum("L"), 1, "Default value is 1");
    assert.strictEqual(convertHandler.getNum("mi"), 1, "Default value is 1");
    assert.strictEqual(convertHandler.getNum("gaL"), 1, "Default value is 1");
    assert.strictEqual(convertHandler.getNum("km"), 1, "Default value is 1");
  });
  test("convertHandler should correctly read each valid input unit.", function () {
    const unitRegex = /gal|L|km|mi|lbs|kg/;
    assert.match(convertHandler.getUnit("2mi"), unitRegex);
    assert.match(convertHandler.getUnit("3.2gaL"), unitRegex);
    assert.match(convertHandler.getUnit("3/2LBS"), unitRegex);
    assert.match(convertHandler.getUnit("3.1.1Km"), unitRegex);
    assert.match(convertHandler.getUnit("5/2/2l"), unitRegex);
    assert.match(convertHandler.getUnit("5.2.2KG"), unitRegex);
  });
  test("convertHandler should correctly return an error for an invalid input unit.", function () {
    assert.throw(
      () => {
        convertHandler.getUnit("3.2a");
      },
      "invalid unit",
      "Error invalid unit should be thrown for invalid units"
    );
    assert.throw(
      () => {
        convertHandler.getUnit("3.2");
      },
      "invalid unit",
      "Error invalid unit should be thrown for invalid units"
    );
    assert.throw(
      () => {
        convertHandler.getUnit("3.2 ");
      },
      "invalid unit",
      "Error invalid unit should be thrown for invalid units"
    );
    assert.throw(
      () => {
        convertHandler.getUnit("3.2 lkd");
      },
      "invalid unit",
      "Error invalid unit should be thrown for invalid units"
    );
    assert.throw(
      () => {
        convertHandler.getUnit("3.2 123");
      },
      "invalid unit",
      "Error invalid unit should be thrown for invalid units"
    );
    assert.throw(
      () => {
        convertHandler.getUnit("3.2 3/2");
      },
      "invalid unit",
      "Error invalid unit should be thrown for invalid units"
    );
  });
  test("convertHandler should return the correct return unit for each valid input unit.", function () {
    assert.equal(convertHandler.getReturnUnit("L"), "gal");
    assert.equal(convertHandler.getReturnUnit("gal"), "L");
    assert.equal(convertHandler.getReturnUnit("km"), "mi");
    assert.equal(convertHandler.getReturnUnit("mi"), "km");
    assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
  });
  test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", function () {
    assert.equal(convertHandler.spellOutUnit("L"), "liters");
    assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
    assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
    assert.equal(convertHandler.spellOutUnit("mi"), "miles");
    assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
  });
  test("convertHandler should correctly convert gal to L.", function () {
    assert.equal(convertHandler.convert(3.1, "gal"), 11.73477);
  });
  test("convertHandler should correctly convert L to gal.", function () {
    assert.equal(convertHandler.convert(5.2, "L"), 1.3737);
  });
  test("convertHandler should correctly convert mi to km.", function () {
    assert.equal(convertHandler.convert(4, "mi"), 6.43736);
  });
  assert.equal(convertHandler.convert(1.5, "km"), 0.93206);
  test("convertHandler should correctly convert km to mi.", function () {
    assert.equal(convertHandler.convert(1.5, "km"), 0.93206);
  });
  test("convertHandler should correctly convert lbs to kg.", function () {
    assert.equal(convertHandler.convert(8, "lbs"), 3.62874);
  });
  test("convertHandler should correctly convert kg to lbs.", function () {
    assert.equal(convertHandler.convert(6, "kg"), 13.22775);
  });

  // suite('Get Number from String', function(){
  //     test('Read whole number',function(){
  //         assert.strictEqual(convertHandler.getNum('2mi'),2,'Whole number not read');
  //     });
  //     test('Read decimal', function(){
  //         assert.strictEqual(convertHandler.getNum('1.5gaL'),1.5,'Decimal Number not read');
  //     });
  //     test('Read fraction', function(){
  //         assert.strictEqual(convertHandler.getNum('1/2L'),0.5,'Fractional Number not read');
  //     });
  //     test('Read decimal with fraction',function(){
  //         assert.strictEqual(convertHandler.getNum('3.2/2km'),1.6,'Fractional Number with decimal not read');
  //     });
  //     test('Empty number gives default 1',function(){
  //         assert.strictEqual(convertHandler.getNum('L'),1,'Default value is 1');
  //         assert.strictEqual(convertHandler.getNum('mi'),1,'Default value is 1');
  //         assert.strictEqual(convertHandler.getNum('gaL'),1,'Default value is 1');
  //         assert.strictEqual(convertHandler.getNum('km'),1,'Default value is 1');

  //     });
  //     test('Throw error for double fractions',function(){
  //         assert.Throw(()=>{convertHandler.getNum('3/1/2km')},'invalid number','Error not thrown for whole number double fractions');
  //         assert.Throw(()=>{convertHandler.getNum('3.1/1.1/2mi')},'invalid number','Error not thrown for mix of decimal doublefractions');
  //         assert.Throw(()=>{convertHandler.getNum('3/1/2.1l')},'invalid number','Error not thrown for more mix of decimal double fractions');
  //         assert.Throw(()=>{convertHandler.getNum('3.7/1.7/0.2L')},'invalid number','Error not thrown for three decimal double fractions');
  //         assert.Throw(()=>{convertHandler.getNum('3/1/2.1.1lbs')},'invalid number','Error not thrown for double decimal double fractions');
  //     });
  //     test('Throw error for double decimals',function(){
  //         assert.throw(()=>{convertHandler.getNum('3.1.1Lbs')},'invalid number','Error not thrown for double decimals');
  //         assert.throw(()=>{convertHandler.getNum('5.7.7/2gal')},'invalid number','Error not thrown for double decimals with fraction');
  //     });
  //     test('Throw error for numbers with space',function(){
  //         assert.Throw(()=>{convertHandler.getNum('3.2 gal')},'invalid number','Error not thrown for double decimal double fractions');
  //         assert.Throw(()=>{convertHandler.getNum(' gal')},'invalid number','Error not thrown for double decimal double fractions');
  //     });
  // });
  // suite("Get unit From String",function(){
  //     const unitRegex = /gal|L|km|mi|lbs|kg/;
  //     test("Get valid unit from each unit", function(){
  //         assert.match(convertHandler.getUnit('2mi'),unitRegex);
  //         assert.match(convertHandler.getUnit('3.2gaL'),unitRegex);
  //         assert.match(convertHandler.getUnit('3/2LBS'),unitRegex);
  //         assert.match(convertHandler.getUnit('3.1.1Km'),unitRegex);
  //         assert.match(convertHandler.getUnit('5/2/2l'),unitRegex);
  //         assert.match(convertHandler.getUnit('5.2.2KG'),unitRegex);
  //     });
  //     test("Throw Invalid unit",function(){
  //         assert.throw(()=>{convertHandler.getUnit("3.2a")},"invalid unit","Error invalid unit should be thrown for invalid units");
  //         assert.throw(()=>{convertHandler.getUnit("3.2")},"invalid unit","Error invalid unit should be thrown for invalid units");
  //         assert.throw(()=>{convertHandler.getUnit("3.2 ")},"invalid unit","Error invalid unit should be thrown for invalid units");
  //         assert.throw(()=>{convertHandler.getUnit("3.2 lkd")},"invalid unit","Error invalid unit should be thrown for invalid units");
  //         assert.throw(()=>{convertHandler.getUnit("3.2 123")},"invalid unit","Error invalid unit should be thrown for invalid units");
  //         assert.throw(()=>{convertHandler.getUnit("3.2 3/2")},"invalid unit","Error invalid unit should be thrown for invalid units");
  //     });
  // });
  // suite("Return the correct unit for given unit",function(){
  //     test("Get correct return unit",function(){
  //         assert.equal(convertHandler.getReturnUnit("L"),"gal");
  //         assert.equal(convertHandler.getReturnUnit("gal"),"L");
  //         assert.equal(convertHandler.getReturnUnit("km"),"mi");
  //         assert.equal(convertHandler.getReturnUnit("mi"),"km");
  //         assert.equal(convertHandler.getReturnUnit("lbs"),"kg");
  //         assert.equal(convertHandler.getReturnUnit("kg"),"lbs");
  //     });
  // });
  // suite("Return spelled unit",function(){
  //     test("Spell the unit",function(){
  //         assert.equal(convertHandler.spellOutUnit("L"),"liters");
  //         assert.equal(convertHandler.spellOutUnit("gal"),"gallons");
  //         assert.equal(convertHandler.spellOutUnit("km"),"kilometers");
  //         assert.equal(convertHandler.spellOutUnit("mi"),"miles");
  //         assert.equal(convertHandler.spellOutUnit("lbs"),"pounds");
  //         assert.equal(convertHandler.spellOutUnit("kg"),"kilograms");
  //     });
  // });
  // suite("Convert Number in return units",function(){
  //     test("Convert units",function(){
  //         // The convert function results are compared with values from freecodecamp website: https://metric-imperial-converter.freecodecamp.rocks/.
  //         assert.equal(convertHandler.convert(3.1,'gal'),11.73477);
  //         assert.equal(convertHandler.convert(5.2,'L'),1.37370);
  //         assert.equal(convertHandler.convert(8,'lbs'),3.62874 );
  //         assert.equal(convertHandler.convert(6,'kg'),13.22775);
  //         assert.equal(convertHandler.convert(4,'mi'),6.43736);
  //         assert.equal(convertHandler.convert(1.5,'km'),0.93206);
  //     });
  // });
  // suite("Spell Strings",function(){
  //     test('#Spell out strings',function(){
  //         assert.equal(convertHandler.getString(3.1,'gal',convertHandler.convert(3.1,'gal'),convertHandler.getReturnUnit('gal')),"3.1 gallons converts to 11.73477 liters");
  //         assert.equal(convertHandler.getString(6,'L',convertHandler.convert(6,'L'),convertHandler.getReturnUnit('L')),"6 liters converts to 1.58503 gallons");
  //         assert.equal(convertHandler.getString(7.2,"lbs",convertHandler.convert(7.2,"lbs"),convertHandler.getReturnUnit('lbs')),"7.2 pounds converts to 3.26586 kilograms");
  //         assert.equal(convertHandler.getString(3.6,'kg',convertHandler.convert(3.6,'kg'),convertHandler.getReturnUnit('kg')),"3.6 kilograms converts to 7.93665 pounds");
  //         assert.equal(convertHandler.getString(4,'mi',convertHandler.convert(4,'mi'),convertHandler.getReturnUnit('mi')),"4 miles converts to 6.43736 kilometers");
  //         assert.equal(convertHandler.getString(10,'km',convertHandler.convert(10,'km'),convertHandler.getReturnUnit('km')),"10 kilometers converts to 6.21373 miles");
  //     });
  // });
});
