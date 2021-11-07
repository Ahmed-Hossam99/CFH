const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const team = await models.team.findById(id);
    if (!team) return APIResponse.NotFound(res, "team not found");

    return APIResponse.Ok(res, team);
});
