const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

const router = express.Router();


router.post("/orders", ctrls.OrderCtrl.createOne);
router.get("/orders", ctrls.OrderCtrl.fetchAll);
router.get("/orders/:id", ctrls.OrderCtrl.fetchOne);

module.exports = router;
