const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

const router = express.Router();

router.post(
    "/add-client",
    policies.isAllowed(["admin"]),
    ctrls.userCtrl.addClient
);


module.exports = router;
