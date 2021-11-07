const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

const router = express.Router();

router.post(
    "/about",
    policies.isAllowed(["admin"]),
    ctrls.AboutCtrl.createOne
);
router.patch(
    "/about",
    policies.isAllowed(["admin"]),
    ctrls.AboutCtrl.updateOne
);

router.delete(
    "/about/:id",
    policies.isAllowed(["admin"]),
    ctrls.AboutCtrl.deleteOne
);

module.exports = router;
