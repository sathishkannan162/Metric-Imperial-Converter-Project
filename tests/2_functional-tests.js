const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);
  suite("GET request for valid numbers", function () {
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
  suite("Test for invalid unit", function(){
    test("Test GET /api/convert?input=4", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=4")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid unit");
          done();
        });
    });
    test("Test GET /api/convert?input=ka", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=4")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid unit");
          done();
        });
    });
    test("Test GET /api/convert?input=kilograms", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=4")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid unit");
          done();
        });
    });
  });
  suite("Test for invalid number",function(){
    test("Test GET /api/convert?input=3.2/2/2kg", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=3.2/2/2kg")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number");
          done();
        });
    });
    test("Test GET /api/convert?input=3.2.2kg", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=3.2.2kg")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number");
          done();
        });
    });
    test("Test GET /api/convert?input=5 kg", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=5 kg")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number");
          done();
        });
    });
    test("Test GET /api/convert?input= kg", function (done) {
      chai
        .request(server)
        .get("/api/convert?input= kg")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number");
          done();
        });
    });
  });
  suite("Test for invalid number and unit",function(){
    test("Test GET /api/convert?input=3.2 ka", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=3.2 ka")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number and unit");
          done();
        });
    });
    test("Test GET /api/convert?input=3.2/2/2ka", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=3.2 ka")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number and unit");
          done();
        });
    });
    test("Test GET /api/convert?input= g", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=3.2 ka")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number and unit");
          done();
        });
    });
  });
});
