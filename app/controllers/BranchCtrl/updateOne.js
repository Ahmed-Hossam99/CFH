const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    if (req.me.role !== 'admin')
        return APIRespons.Unauthorized(res, "don't allow to do this action")
    const branch = await models.branch.findById(id);
    if (!branch) return APIResponse.NotFound(res, "No branch With That Id");

    delete req.body.region

    await branch.set(req.body).save();

    return APIResponse.Ok(res, branch);
});
