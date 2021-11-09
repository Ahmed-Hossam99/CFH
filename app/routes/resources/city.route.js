const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

const router = express.Router();

router.post(
    "/city",
    policies.isAllowed(["admin"]),
    ctrls.CityCtrl.createOne
);
router.patch(
    "/city/:id",
    policies.isAllowed(["admin"]),
    ctrls.CityCtrl.updateOne
);

router.delete(
    "/city/:id",
    policies.isAllowed(["admin"]),
    ctrls.CityCtrl.deleteOne
);

module.exports = router;
