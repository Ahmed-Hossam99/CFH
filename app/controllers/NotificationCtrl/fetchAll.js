const _ = require("lodash");
const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  const user = req.authenticatedUser;
  const notifications = await models.notification.fetchAll(
    true,
    { ...req.queryFilter, targetUsers: user.id },
    { ...req.queryOptions, sort: "-_id", select: "-targetUsers -readBy" }
  );

  await models.notification.updateMany(
    { targetUsers: req.me.id },
    { $addToSet: { readBy: req.me.id } }
  );

  return APIResponse.Ok(res, notifications);
});
