const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  const user = req.authenticatedUser;
  const count = await models.notification.countDocuments({
    targetUsers: user.id,
    readBy: { $ne: user.id },
  });

  const response = { count: count };
  return APIResponse.Ok(res, response);
});
