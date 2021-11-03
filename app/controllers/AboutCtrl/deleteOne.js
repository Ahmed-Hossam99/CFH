const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const about = await models.about.findById(id);
    if (!about) return APIResponse.NotFound(res, "NO details With That Id");

    await about.delete();

    return APIResponse.NoContent(res);
});
