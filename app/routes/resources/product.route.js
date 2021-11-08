const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

const router = express.Router();

router.post(
    "/tests",
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
    "/tests/:id",
    policies.isAllowed(["admin"]),
    ctrls.ProductCtrl.updateOne
);
router.patch(
    "/packages/:id",
    policies.isAllowed(["admin"]),
    ctrls.ProductCtrl.updateOne
);
router.patch(
    "/offers/:id",
    policies.isAllowed(["admin"]),
    ctrls.ProductCtrl.updateOne
);
//======================================
router.delete(
    "/tests/:id",
    policies.isAllowed(["admin"]),
    ctrls.ProductCtrl.deleteOne
);
router.delete(
    "/packages/:id",
    policies.isAllowed(["admin"]),
    ctrls.ProductCtrl.deleteOne
);
router.delete(
    "/offers/:id",
    policies.isAllowed(["admin"]),
    ctrls.ProductCtrl.deleteOne
);

module.exports = router;
