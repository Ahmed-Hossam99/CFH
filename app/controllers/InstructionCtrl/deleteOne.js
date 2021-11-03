const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {

    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const instruction = await models.instruction.findById(id);
    if (!instruction) return APIResponse.NotFound(res, "NO instruction With That Id");

    await instruction.delete();

    return APIResponse.NoContent(res);
});
