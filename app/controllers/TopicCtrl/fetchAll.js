const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  const topics = await models.topic.fetchAll(
    req.allowPagination,
    req.queryFilter,
    {
      ...req.queryOptions,
      populate: ["category"],
    }
  );
  return APIResponse.Ok(res, topics);
});
