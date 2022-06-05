const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) =>
{
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const poll = await models.poll.findById(id).populate({
        path: 'answers', populate: { path: 'question', select: 'questionAr questionEn' }
    });
    if (!poll) return APIResponse.NotFound(res, "poll not found");

    return APIResponse.Ok(res, poll);
});
