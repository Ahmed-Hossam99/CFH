const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

const router = express.Router();

router.post(
  "/category/:id/topics",
  policies.isAllowed(["admin"]),
  ctrls.TopicCtrl.createOne
);
router.patch(
  "/topics/:id",
  policies.isAllowed(["admin"]),
  ctrls.TopicCtrl.updateOne
);
router.delete(
  "/topics/:id",
  policies.isAllowed(["admin"]),
  ctrls.TopicCtrl.deleteOne
);

module.exports = router;
