const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

const router = express.Router();

router.post(
    "/contact",
    policies.isAllowed(["admin"]),
    ctrls.ContactCtrl.createOne
);
router.patch(
    "/contact/:id",
    policies.isAllowed(["admin"]),
    ctrls.ContactCtrl.updateOne
);
router.get(
    "/contact/:id",
    policies.isAllowed(["admin"]),
    ctrls.ContactCtrl.fetchOne
);
router.get(
    "/contacts",
    policies.isAllowed(["admin"]),
    ctrls.ContactCtrl.fetchAll
);
router.delete(
    "/contact/:id",
    policies.isAllowed(["admin"]),
    ctrls.ContactCtrl.deleteOne
);

module.exports = router;
