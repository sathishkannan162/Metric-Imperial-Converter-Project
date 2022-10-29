const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);
  suite("GET request to API using chai http", function () {
    test("Test GET /api/convert?input=2kg", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=2kg")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(
            res.text,
            '{"initNum":2,"initUnit":"kg","returnNum":4.40925,"returnUnit":"lbs","string":"2 kilograms converts to 4.40925 pounds"}'
          );
          done();
        });
    });
    test("Test GET /api/convert?input=1/2km", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=1/2km")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(
            res.text,
            '{"initNum":0.5,"initUnit":"km","returnNum":0.31069,"returnUnit":"mi","string":"0.5 kilometers converts to 0.31069 miles"}'
          );
          done();
        });
    });
    test("Test GET /api/convert?input=5.4/3lbs", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=5.4/3lbs")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(
            res.text,
            '{"initNum":1.8,"initUnit":"lbs","returnNum":0.81647,"returnUnit":"kg","string":"1.8 pounds converts to 0.81647 kilograms"}'
          );
          done();
        });
    });
    test("Test GET /api/convert?input=gal", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=gal")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(
            res.text,
            '{"initNum":1,"initUnit":"gal","returnNum":3.78541,"returnUnit":"L","string":"1 gallons converts to 3.78541 liters"}'
          );
          done();
        });
    });
  });
});
