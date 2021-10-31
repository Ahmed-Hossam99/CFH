const jwt = require("jsonwebtoken");
const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const bcrypt = require("bcryptjs");

module.exports = $baseCtrl(async (req, res) => {
  if (req.body.phone === undefined || req.body.password === undefined) {
    return APIResponse.BadRequest(res, "password/phone are required");
  }

  const user = await models._user.findOne({ phone: req.body.phone });
  if (!user) {
    return res.status(401).json({ flag: 1002 });
  }

  if (!user.password) return res.status(401).json({ flag: 1004 });
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(401).json({ flag: 1003 });
  }

  if (!user.enabled) {
    return res.status(401).json({ flag: 1005 });
  }

  let payload = { userId: user.id, userRole: user.role };
  let options = {};
  let token = jwt.sign(payload, process.env.JWT_SECRET, options);

  const response = {
    token: token,
    user: user,
  };

  if (!user.used) {
    user.used = true;
    await user.save();
  }

  return APIResponse.Ok(res, response);
});
