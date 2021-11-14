const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

const router = express.Router();

router.post(
    "/add-tests",
    policies.isAllowed(["admin"]),
    ctrls.ProductCtrl.createOne
); router.post(
    "/packages",
    policies.isAllowed(["admin"]),
    ctrls.ProductCtrl.createOne
); router.post(
    "/offers",
    policies.isAllowed(["admin"]),
    ctrls.ProductCtrl.createOne
);
//=============================
router.patch(
    "/product/:id",
    policies.isAllowed(["admin"]),
    ctrls.ProductCtrl.updateOne
);
//======================================
router.delete(
    "/product/:id",
    policies.isAllowed(["admin"]),
    ctrls.ProductCtrl.deleteOne
);


module.exports = router;
