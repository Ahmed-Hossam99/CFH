const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    if (req.me.role !== 'admin')
        return APIRespons.Unauthorized(res, "don't allow to do this action")

    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    // fetch specific citys by id
    const city = await models.city.findById(id);
    if (!city) return APIResponse.NotFound(res, "NO city With That Id");

    await city.delete();

    return APIResponse.NoContent(res);
});
