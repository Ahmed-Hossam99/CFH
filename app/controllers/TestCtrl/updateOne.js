const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const team = await models.team.findById(id);
    if (!team) return APIResponse.NotFound(res, "No team With That Id");
    if (req.body.files && req.files['image']) {
        req.body.image = req.files['image'][0].secure_url;
    }
    await team.set(req.body).save();

    return APIResponse.Ok(res, team);
});
