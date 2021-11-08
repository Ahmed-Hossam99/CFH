const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

const router = express.Router();

// router.post(
//     "/package",
//     policies.isAllowed(["admin"]),
//     ctrls.PackageCtrl.createOne
// );
// router.patch(
//     "/package/:id",
//     policies.isAllowed(["admin"]),
//     ctrls.PackageCtrl.updateOne
// );

// router.delete(
//     "/package/:id",
//     policies.isAllowed(["admin"]),
//     ctrls.PackageCtrl.deleteOne
// );

module.exports = router;
