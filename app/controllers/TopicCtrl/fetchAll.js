const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const { escapeRegExp } = require("lodash");

module.exports = $baseCtrl(async (req, res) => {
  if (req.query.titleAr) {
    req.queryFilter['titleAr'] = new RegExp(
      escapeRegExp(req.query.titleAr),
      "i")
  }
  if (req.query.titleEn) {
    req.queryFilter['titleEn'] = new RegExp(
      escapeRegExp(req.query.titleEn),
      "i")
  }
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
