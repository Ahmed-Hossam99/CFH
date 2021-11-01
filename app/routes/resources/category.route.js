const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

const router = express.Router();

router.post(
  "/category",
  policies.isAllowed(["admin"]),
  ctrls.CategoryCtrl.createOne
);
router.patch(
  "/category",
  policies.isAllowed(["admin"]),
  ctrls.CategoryCtrl.updateOne
);
router.delete(
  "/category/:id",
  policies.isAllowed(["admin"]),
  ctrls.CategoryCtrl.deleteOne
);

module.exports = router;
