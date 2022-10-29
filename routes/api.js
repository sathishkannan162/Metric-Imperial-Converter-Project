"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    let error1, error2;
    try {
      convertHandler.getNum(req.query.input);
    } catch (error) {
      error1 = error;
    }

    try {
      convertHandler.getUnit(req.query.input);
    } catch (error) {
      error2 = error;
    }
    if (error1 == "invalid number" && error2 == "invalid unit") {
      res.send("invalid number and unit");
    } else if (error1 == "invalid number") {
      res.send("invalid number");
    } else if (error2 == "invalid unit") {
      res.send("invalid unit");
    } else {
      let initNum = convertHandler.getNum(req.query.input);
      let initUnit = convertHandler.getUnit(req.query.input);

      res.json({
        initNum,
        initUnit,
        returnNum: Number(convertHandler.convert(initNum, initUnit)),
        returnUnit: convertHandler.getReturnUnit(initUnit),
        string: convertHandler.getString(
          initNum,
          initUnit,
          convertHandler.convert(initNum, initUnit),
          convertHandler.getReturnUnit(initUnit)
        ),
      });
    }
  });
};
