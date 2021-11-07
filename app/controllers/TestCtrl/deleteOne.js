const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {

    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const team = await models.team.findById(id);
    if (!team) return APIResponse.NotFound(res, "NO team With That Id");

    await team.delete();

    return APIResponse.NoContent(res);
});
