const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const instruction = await models.instruction.findById(id);
    if (!instruction) return APIResponse.NotFound(res, "instruction not found");

    return APIResponse.Ok(res, instruction);
});
