const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const order = await models._order.findById(id);
    if (!order) return APIResponse.NotFound(res, "NO order With That Id");

    await order.delete();

    return APIResponse.NoContent(res);
});
