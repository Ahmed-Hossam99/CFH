const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

const router = express.Router();

router.post(
    "/tests",
    policies.isAllowed(["admin"]),
    ctrls.OrderCtrl.createOne
);

router.post("/orders-normal", ctrls.OrderCtrl.createOne);
router.post("/order-offer", ctrls.OrderCtrl.createOne);
router.get("/orders", ctrls.OrderCtrl.fetchAll);
router.get("/orders/:id", ctrls.OrderCtrl.fetchOne);
router.patch("/orders/:id", ctrls.OrderCtrl.updateOne);
router.delete("/orders/:id",
    policies.isAllowed(["admin"]),
    ctrls.OrderCtrl.deleteOne);


module.exports = router;
