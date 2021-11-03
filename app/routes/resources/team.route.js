const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

const router = express.Router();

router.post(
    "/team",
    policies.isAllowed(["admin"]),
    ctrls.TeamCtrl.createOne
);
router.patch(
    "/team/:id",
    policies.isAllowed(["admin"]),
    ctrls.TeamCtrl.updateOne
);
router.get(
    "/team/:id",
    policies.isAllowed(["admin"]),
    ctrls.TeamCtrl.fetchOne
);
router.get(
    "/teams",
    policies.isAllowed(["admin"]),
    ctrls.TeamCtrl.fetchAll
);
router.delete(
    "/team/:id",
    policies.isAllowed(["admin"]),
    ctrls.TeamCtrl.deleteOne
);

module.exports = router;
