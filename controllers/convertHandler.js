function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = input.match(/[\d\./]+/);
    if (result == null) {
      return 1;
    }
    // if result is not null, the 0 index contains the number
    result = result[0];
    if (/^\d*\.?\d*$/.test(result)) {
      return eval(result);
    }
    
    let operator = result.match(/[/]/g);
    try {
      result=eval(result);
    } catch (error) {
      throw 'invalid number'
    }
    if (operator == null) {
      return result;
    }
    if (operator.length==1) {
      return result;
    }
    throw 'invalid number'
  };
  
  this.getUnit = function(input) {
    let result;
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
