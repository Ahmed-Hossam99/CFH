const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    // fetch specif level
    const about = await models.about.findById(id);
    if (!about) return APIResponse.NotFound(res, "No about With That Id");
    if (req.body.files && req.files['image']) {
        req.body.image = req.files['image'][0].secure_url;
    }
    await about.set(req.body).save();

    return APIResponse.Ok(res, about);
});
