const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

const router = express.Router();

router.post(
    "/ads",
    policies.isAllowed(["admin"]),
    ctrls.AdsCtrl.createOne
);
router.patch(
    "/ads/:id",
    policies.isAllowed(["admin"]),
    ctrls.AdsCtrl.updateOne
);

router.delete(
    "/ads/:id",
    policies.isAllowed(["admin"]),
    ctrls.AdsCtrl.deleteOne
);

module.exports = router;
