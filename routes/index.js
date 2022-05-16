var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Hello, this backend has been overwritten by Duy Tung");
});

module.exports = router;
