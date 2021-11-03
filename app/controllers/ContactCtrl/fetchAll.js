const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const contacts = await models.contact.fetchAll(
        req.allowPagination,
        req.queryFilter,
        req.queryOptions,

    );
    return APIResponse.Ok(res, contacts);
});
