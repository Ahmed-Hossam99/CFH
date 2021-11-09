const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

const router = express.Router();

router.post(
    "/city/:id/region",
    policies.isAllowed(["admin"]),
    ctrls.RegionCtrl.createOne
);
router.patch(
    "/region/:id",
    policies.isAllowed(["admin"]),
    ctrls.RegionCtrl.updateOne
);

router.delete(
    "/region/:id",
    policies.isAllowed(["admin"]),
    ctrls.RegionCtrl.deleteOne
);

module.exports = router;
