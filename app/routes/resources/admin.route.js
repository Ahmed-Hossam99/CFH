const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

const router = express.Router();

router.post(
    "/add-client",
    policies.isAllowed(["admin"]),
    ctrls.AdminCtrl.addClient
);

router.get(
    "/fetch/clients",
    policies.isAllowed(["admin"]),
    ctrls.AdminCtrl.fetchAll
);

router.get(
    "/fetch/:id/client",
    policies.isAllowed(["admin"]),
    ctrls.AdminCtrl.fetchOne
);



router.delete(
    "/delete/:id/client",
    policies.isAllowed(["admin"]),
    ctrls.AdminCtrl.deleteOne
);

router.put(
    "/update/:id/client",
    policies.isAllowed(["admin"]),
    ctrls.AdminCtrl.updateOne
);




module.exports = router;
