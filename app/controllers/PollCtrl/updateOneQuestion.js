const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) =>
{
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const question = await models.question.findById(id);
    if (!question) return APIResponse.NotFound(res, "No question With That Id");
    await question.set(req.body).save();

    return APIResponse.Ok(res, question);
});
