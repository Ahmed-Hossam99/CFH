const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) =>
{
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const poll = await models.poll.findById(id);
    if (!poll) return APIResponse.NotFound(res, "No poll With That Id");
    await poll.set(req.body).save();

    return APIResponse.Ok(res, poll);
});
