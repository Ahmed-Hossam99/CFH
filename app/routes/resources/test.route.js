const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

const router = express.Router();

router.post(
    "/new-test",
    policies.isAllowed(["admin"]),
    ctrls.TestCtrl.createOne
);
router.patch(
    "/test/:id",
    policies.isAllowed(["admin"]),
    ctrls.TestCtrl.updateOne
);

router.delete(
    "/test/:id",
    policies.isAllowed(["admin"]),
    ctrls.TestCtrl.deleteOne
);

module.exports = router;
