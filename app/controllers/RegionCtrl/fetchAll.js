const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const regions = await models.region.fetchAll(
        req.allowPagination,
        req.queryFilter,

        {
            ...req.queryOptions,
            populate: ['city']
        }
    );
    return APIResponse.Ok(res, regions);
});
