const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {

    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const result = await models.result.findById(id).populate(["subject", "client"]);
    if (!result) return APIResponse.NotFound(res, "result not found");

    return APIResponse.Ok(res, result);
});
