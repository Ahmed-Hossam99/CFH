const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) =>
{
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const user = await models._user.findById(id);
    if (!user) return APIResponse.NotFound(res, "user With That Id");

    if (req.me.role !== "admin")
        return APIResponse.Forbidden(res);

    await user.delete();

    return APIResponse.NoContent(res);
});
