var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/testing", (req, res) => {
  return res.status(200).send({ message: "get testig item successfully" });
});

module.exports = router;
