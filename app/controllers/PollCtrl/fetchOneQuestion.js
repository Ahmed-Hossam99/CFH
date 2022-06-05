const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) =>
{
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const question = await models.question.findById(id);
    if (!question) return APIResponse.NotFound(res, "question not found");

    return APIResponse.Ok(res, question);
});
