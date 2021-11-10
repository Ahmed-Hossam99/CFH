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
router.get("/orders-normal", ctrls.OrderCtrl.fetchAll);

router.patch(
    "/orders/:id", ctrls.OrderCtrl.updateOne);
// router.post(
//     "/offers",
//     policies.isAllowed(["admin"]),
//     ctrls.OrderCtrl.createOne
// );
// //=============================
router.patch(
    "/product/:id",
    policies.isAllowed(["admin"]),
    ctrls.OrderCtrl.updateOne
);
// //======================================
// router.delete(
//     "/product/:id",
//     policies.isAllowed(["admin"]),
//     ctrls.OrderCtrl.deleteOne
// );


module.exports = router;
