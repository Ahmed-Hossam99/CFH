const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const result = await models.result.findById(id);
    if (!result) return APIResponse.NotFound(res, "NO result With That Id");
    if (result.subjectType === 'order') {
        let order = await models._order.findOne({ result: result._id })
        order.result = undefined;
        order.result = 'inProgress'
        await order.save()
    }

    await result.delete();

    return APIResponse.NoContent(res);
});
