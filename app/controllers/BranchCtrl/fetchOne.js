const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const branch = await models.branch.findById(id).populate(["region"]);
    if (!branch) return APIResponse.NotFound(res, "branch not found");

    return APIResponse.Ok(res, branch);
});
