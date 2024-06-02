const express = require("express");
const policies = require("../policies");
const ctrls = require("../controllers");
const resources = require("./resources");
const passport = require("passport");
// require("../services/passport");

let apiRouter = express.Router();

// Public APIs

// ======================= Authentication ==================
apiRouter.post("/signup", ctrls.AuthCtrl.signupPhone);
apiRouter.post("/forget", ctrls.AuthCtrl.sendForgetSMSPhone);
apiRouter.post("/check-code", ctrls.AuthCtrl.checkForgetCode);
apiRouter.post("/reset-password", ctrls.AuthCtrl.resetPasswordAfterCheck);
apiRouter.post("/verify", ctrls.AuthCtrl.verifyAccountByPhoneCode);
apiRouter.post("/login-phone", ctrls.AuthCtrl.loginPhone);
apiRouter.post("/login-email", ctrls.AuthCtrl.loginEmail);
apiRouter.post("/signup-email", ctrls.AuthCtrl.signupEmail);
apiRouter.post("/resend", ctrls.AuthCtrl.SendForgetCodeEmail);
apiRouter.post("/remove-phone", ctrls.AuthCtrl.removePhoneNumber);
apiRouter.post("/login-google", passport.authenticate("googleToken1", { session: false }), ctrls.AuthCtrl.loginGoogle);// midellware befor google authnetication
apiRouter.post("/login-facebook", ctrls.AuthCtrl.loginFacebook);

// =========== product =====================
apiRouter.get("/products", ctrls.ProductCtrl.fetchAll);
apiRouter.get("/product/:id", ctrls.ProductCtrl.fetchOne);


// private APIS here we are using policies midellware to authenticate routes 
apiRouter.use(policies.isAuthenticated);

// populate all resources
for (let key of Object.keys(resources)) {
  let resource = resources[key];
  apiRouter.use(resource);
}

module.exports = apiRouter;
