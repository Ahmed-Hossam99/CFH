const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

let router = express.Router();

router.post("/images", ctrls.ImgCtrl.createMany);

module.exports = router;