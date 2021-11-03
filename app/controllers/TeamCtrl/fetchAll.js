const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const teams = await models.team.fetchAll(
        req.allowPagination,
        req.queryFilter,
        req.queryOptions
    );
    return APIResponse.Ok(res, teams);
});
