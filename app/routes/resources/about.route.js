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
    "/about/:id",
    policies.isAllowed(["admin"]),
    ctrls.AboutCtrl.updateOne
);
router.get(
    "/about/:id",
    policies.isAllowed(["admin"]),
    ctrls.AboutCtrl.fetchOne
);
router.get(
    "/abouts",
    policies.isAllowed(["admin"]),
    ctrls.AboutCtrl.fetchAll
);
router.delete(
    "/about/:id",
    policies.isAllowed(["admin"]),
    ctrls.AboutCtrl.deleteOne
);

module.exports = router;
