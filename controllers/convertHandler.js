function ConvertHandler() {
  
  this.getNum = function(input) {
    let unitRegex = /[a-zA-Z]+$/;
    let result = input.replace(unitRegex,'');
    if (result =='') {
      return 1;
    }
    if (/^\d*\.?\d*$/.test(result)) {
      return eval(result);
    }
    if (/^\d*\.?\d*\/\d*\.?\d*$/.test(result)) {
      return eval(result);
    }
    throw 'invalid number'
  };
  
  this.getUnit = function(input) {
    let unitRegex = /[a-z]+$/gi;
    let result = input.match(unitRegex);
    if (result==null){
      throw "invalid unit";
    }
   
    // the result will be an array after match
    result = result[0].toLowerCase();
    if (result=='l') {
      return 'L'
    }
    if (['gal','km','lbs','mi','kg'].includes(result)){
      return result;
    }
    throw "invalid unit";
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    let inputUnit = ["L",    "gal",    "km",    "mi",    "lbs",    "kg"];
    let returnUnit = ["gal",   "L",   "mi",   "km",   "kg",   "lbs"];
    result=returnUnit[inputUnit.indexOf(initUnit)];
    return result;
  };

  this.spellOutUnit = function(unit) {
    let inputUnit = ["L",    "gal",    "km",    "mi",    "lbs",    "kg"];
    let unitspelled = ["liters","gallons","kilometers","miles","pounds","kilograms"];
    let result = unitspelled[inputUnit.indexOf(unit)];
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch(initUnit) {
      case "L":
        return (initNum/galToL).toFixed(5);
      case "gal":
        return (initNum*galToL).toFixed(5);
      case "km":
        return (initNum/miToKm).toFixed(5);
      case "mi":
        return (initNum*miToKm).toFixed(5);
      case "kg":
        return (initNum/lbsToKg).toFixed(5);
      case "lbs":
        return (initNum*lbsToKg).toFixed(5);
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    return result;
  };
  
}

module.exports = ConvertHandler;
