const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {

    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const offer = await models.offer.findById(id);
    if (!offer) return APIResponse.NotFound(res, "NO offer With That Id");

    await offer.delete();

    return APIResponse.NoContent(res);
});
