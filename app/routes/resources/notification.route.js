const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

const router = express.Router();

router.get("/notifications", ctrls.NotificationCtrl.fetchAll);
router.post("/notifications/subscribe", ctrls.NotificationCtrl.subscribe);
router.post("/notifications/unsubscribe", ctrls.NotificationCtrl.unsubscribe);
router.get("/notifications/count", ctrls.NotificationCtrl.fetchCount);
// router.post(
//   "/notifications/dashboard",
//   policies.isAllowed(["admin"]),
//   ctrls.NotificationCtrl.Dashboard.sendNotification
// );

module.exports = router;
