const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");
let router = express.Router();

router.put("/change-password", ctrls.userCtrl.changePassword);
router.patch("/profile", ctrls.userCtrl.updateProfile);
router.get("/profile", ctrls.userCtrl.me);

router.get(
    "/count/users",
    policies.isAllowed(["admin"]),
    ctrls.userCtrl.countUsers
);
module.exports = router;
