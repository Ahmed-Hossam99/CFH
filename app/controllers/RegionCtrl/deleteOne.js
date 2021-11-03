const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    if (req.me.role !== 'admin')
        return APIRespons.Unauthorized(res, "don't allow to do this action")

    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    // fetch specific regions by id
    const region = await models.region.findById(id);
    if (!region) return APIResponse.NotFound(res, "NO region With That Id");
    await models.branch.deleteMany({ region: id });
    await region.delete();
    return APIResponse.NoContent(res);
});
