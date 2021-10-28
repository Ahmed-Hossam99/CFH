const jwt = require("jsonwebtoken");
const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const smsService = require("../../services/sms");

// [TODO] refactor this with html page
module.exports = $baseCtrl(async (req, res) => {
  const forgetCode = req.body.code;
  const phone = req.body.phone;

  var verificationResult = await smsService.verificationCode(phone, forgetCode);
  if (verificationResult.status !== "approved") {
    return APIResponse.BadRequest(res, "Code is invailed");
  }

  let user = await models._user.findOne({ phone });

  await user.set({ isAllowedToResetPassword: true }).save();

  return APIResponse.Ok(res, user);
});
