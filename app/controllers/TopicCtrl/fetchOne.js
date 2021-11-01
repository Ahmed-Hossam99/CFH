const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return APIResponse.NotFound(res);
  const topic = await models.topic.findById(id);
  if (!topic) return APIResponse.NotFound(res, "topic not found");

  return APIResponse.Ok(res, topic);
});
