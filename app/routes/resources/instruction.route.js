const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

const router = express.Router();

router.post(
    "/instruction",
    policies.isAllowed(["admin"]),
    ctrls.InstructionCtrl.createOne
);
router.patch(
    "/instruction/:id",
    policies.isAllowed(["admin"]),
    ctrls.InstructionCtrl.updateOne
);
router.get(
    "/instruction/:id",
    policies.isAllowed(["admin"]),
    ctrls.InstructionCtrl.fetchOne
);
router.get(
    "/instructions",
    policies.isAllowed(["admin"]),
    ctrls.InstructionCtrl.fetchAll
);
router.delete(
    "/instruction/:id",
    policies.isAllowed(["admin"]),
    ctrls.InstructionCtrl.deleteOne
);

module.exports = router;
