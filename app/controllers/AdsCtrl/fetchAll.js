const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  const ads = await models.ads.fetchAll(
    req.allowPagination,
    req.queryFilter,
    {

      ...req.queryOptions,
      populate: ["branches"]
    }
  );
  return APIResponse.Ok(res, ads);
});
