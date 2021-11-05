const jwt = require("jsonwebtoken");
const $baseCtrl = require("../$baseCtrl");
const { APIResponse } = require("../../utils");
const bcrypt = require("bcryptjs");

// [TODO] refactor this with html page
module.exports = $baseCtrl(async (req, res) => {
  let user = req.authenticatedUser;
  if (!req.body.oldpassword)
    return APIResponse.Unauthorized(res, "oldpassword is required");
  if (!req.body.newpassword)
    return APIResponse.BadRequest(res, "newpassword is required");
  // check if password correct
  const isMatch = await bcrypt.compare(req.body.oldpassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ flag: 1006 });
  }
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.newpassword, salt);
  user.password = hash;
  await user.save();
  const response = {
    user,
  };
  return APIResponse.Ok(res, response);
});
