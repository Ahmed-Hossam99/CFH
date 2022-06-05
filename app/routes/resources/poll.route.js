const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

const router = express.Router();

router.post(
    "/poll",
    policies.isAllowed(["admin"]),
    ctrls.PollCtrl.createOnePoll
);

router.post(
    "/question",
    policies.isAllowed(["admin"]),
    ctrls.PollCtrl.createQuestion
);

router.get(
    "/poll/:id",
    ctrls.PollCtrl.fetchOnePoll
);

router.get(
    "/question/:id",
    ctrls.PollCtrl.fetchOneQuestion
);

router.get(
    "/polls",
    ctrls.PollCtrl.fetchAllPoll
);

// router.get(
//     "/questions",
//     ctrls.PollCtrl.fetchAllQuestion
// );

router.get(
    "/polls/count",
    ctrls.PollCtrl.countPoll
);

router.patch(
    "/poll/:id",
    policies.isAllowed(["admin"]),
    ctrls.PollCtrl.updateOnePoll
);

router.patch(
    "/question/:id",
    policies.isAllowed(["admin"]),
    ctrls.PollCtrl.updateOneQuestion
);

router.delete(
    "/poll/:id",
    policies.isAllowed(["admin"]),
    ctrls.PollCtrl.deleteOnePoll
);

router.delete(
    "/question/:id",
    policies.isAllowed(["admin"]),
    ctrls.PollCtrl.deleteOneQuestion
);

module.exports = router;
