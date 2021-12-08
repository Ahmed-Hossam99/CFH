const _ = require("lodash");
const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  const user = req.authenticatedUser;
  const notifications = await models.notification.fetchAll(
    true,
    { ...req.queryFilter, receiver: user.id },
    { ...req.queryOptions, sort: "-_id", select: "-targetUsers -readBy" }
  );

  await models.notification.updateMany(
    { receiver: req.me.id },
    { $set: { read: true } },
  );

  return APIResponse.Ok(res, notifications);
});
