const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return APIResponse.NotFound(res);
  const category = await models.category.findById(id);
  if (!category) return APIResponse.NotFound(res, "category not found");

  return APIResponse.Ok(res, category);
});
