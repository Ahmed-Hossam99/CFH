const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    if (req.me.role !== 'admin')
        return APIRespons.Unauthorized(res, "don't allow to do this action")

    // fetch specif level
    const city = await models.city.findById(id);
    if (!city) return APIResponse.NotFound(res, "No city With That Id");
    await city.set(req.body).save();

    return APIResponse.Ok(res, city);
});
