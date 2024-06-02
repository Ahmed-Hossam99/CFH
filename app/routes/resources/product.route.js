const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

const router = express.Router();

router.post(
    "/add-product",
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
