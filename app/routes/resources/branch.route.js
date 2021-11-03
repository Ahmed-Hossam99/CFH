const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

const router = express.Router();

router.post(
    "/region/:id/branch",
    policies.isAllowed(["admin"]),
    ctrls.BranchCtrl.createOne
);
router.patch(
    "/branch/:id",
    policies.isAllowed(["admin"]),
    ctrls.BranchCtrl.updateOne
); router.get(
    "/branches",
    policies.isAllowed(["admin"]),
    ctrls.BranchCtrl.fetchAll
);
router.get(
    "/branch/:id",
    policies.isAllowed(["admin"]),
    ctrls.BranchCtrl.fetchOne
);
router.delete(
    "/branch/:id",
    policies.isAllowed(["admin"]),
    ctrls.BranchCtrl.deleteOne
);

module.exports = router;
