const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);

    const region = await models.region.findById(id);
    if (!region) return APIResponse.NotFound(res, "No region With That Id");

    delete req.body.city

    await region.set(req.body).save();

    return APIResponse.Ok(res, region);
});
