const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const contact = await models.contact.findById(id);
    if (!contact) return APIResponse.NotFound(res, "No contact With That Id");
    await contact.set(req.body).save();

    return APIResponse.Ok(res, contact);
});
