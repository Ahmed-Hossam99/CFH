const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const city = await models.city.findById(id);
    if (!city) return APIResponse.NotFound(res, "NO city With That Id");
    await models.region.deleteMany({ city: id });
    await models.branch.deleteMany({ city: id });

    await city.delete();

    return APIResponse.NoContent(res);
});
