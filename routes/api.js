'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req,res)=>{
    let initNum = convertHandler.getNum(req.query.input);
    let initUnit = convertHandler.getUnit(req.query.input);
    res.json({
      initNum,
      initUnit,
      returnNum: Number(convertHandler.convert(initNum,initUnit)),
      returnUnit: convertHandler.getReturnUnit(initUnit),
      string: convertHandler.getString(initNum,initUnit,convertHandler.convert(initNum,initUnit),convertHandler.getReturnUnit(initUnit))
    });
  })

};
