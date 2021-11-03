const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const about = await models.about.findById(id);
    if (!about) return APIResponse.NotFound(res, "about not found");

    return APIResponse.Ok(res, about);
});
