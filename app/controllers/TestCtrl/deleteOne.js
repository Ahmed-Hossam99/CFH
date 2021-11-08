const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {

    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const test = await models.test.findById(id);
    if (!test) return APIResponse.NotFound(res, "NO test With That Id");

    await test.delete();

    return APIResponse.NoContent(res);
});
