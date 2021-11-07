const express = require("express");
const policies = require("../policies");
const ctrls = require("../controllers");
const resources = require("./resources");
const passport = require("passport");
// require("../services/passport");

let apiRouter = express.Router();

// public
// apiRouter.post("/verify-reset", ctrls.AuthCtrl.resetPasswordByPhone);
apiRouter.post("/forget", ctrls.AuthCtrl.sendForgetSMSPhone);
apiRouter.post("/check-code", ctrls.AuthCtrl.checkForgetCode);
apiRouter.post("/reset-password", ctrls.AuthCtrl.resetPasswordAfterCheck);
apiRouter.post("/signup", ctrls.AuthCtrl.signupPhone);
apiRouter.post("/verify", ctrls.AuthCtrl.verifyAccountByPhoneCode);
apiRouter.post("/login-phone", ctrls.AuthCtrl.loginPhone);
apiRouter.post("/signup-email", ctrls.AuthCtrl.signupEmail);
apiRouter.post("/resend", ctrls.AuthCtrl.SendForgetCodeEmail);
apiRouter.post("/remove-phone", ctrls.AuthCtrl.removePhoneNumber);
// apiRouter.post("/reset-password", ctrls.AuthCtrl.resetPasswordByEmail);
apiRouter.post(
  "/login-google",
  passport.authenticate("googleToken1", { session: false }),
  ctrls.AuthCtrl.loginGoogle
);
apiRouter.post("/login-facebook", ctrls.AuthCtrl.loginFacebook);
apiRouter.get("/category", ctrls.CategoryCtrl.fetchAll);
apiRouter.get("/category/:id", ctrls.CategoryCtrl.fetchOne);
apiRouter.get("/topics", ctrls.TopicCtrl.fetchAll);
apiRouter.get("/topics/:id", ctrls.TopicCtrl.fetchOne);


apiRouter.get("/instruction/:id", ctrls.InstructionCtrl.fetchOne);
apiRouter.get("/instructions", ctrls.InstructionCtrl.fetchAll);

apiRouter.get("/team/:id", ctrls.TeamCtrl.fetchOne);
apiRouter.get("/teams", ctrls.TeamCtrl.fetchAll);

apiRouter.get("/about/", ctrls.AboutCtrl.fetchOne);
apiRouter.get("/abouts", ctrls.AboutCtrl.fetchAll);

apiRouter.post("/contact", ctrls.ContactCtrl.createOne);



apiRouter.post("/test", ctrls.AuthCtrl.test);
// private
apiRouter.use(policies.isAuthenticated);

// populate all resources
for (let key of Object.keys(resources)) {
  let resource = resources[key];
  apiRouter.use(resource);
}

module.exports = apiRouter;
