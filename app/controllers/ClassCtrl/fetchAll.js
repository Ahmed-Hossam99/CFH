const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return APIResponse.NotFound(res);
  let level = await models.level.findById(id);
  if (!level) return APIResponse.NotFound(res, "No Level With that id");

  const classes = await models.class.fetchAll(
    req.allowPagination,
    {
      ...req.queryFilter,
      level: id,
    },
    req.queryOptions
  );

  return APIResponse.Ok(res, classes);
});
