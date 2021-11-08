const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const tests = await models.test.fetchAll(
        req.allowPagination,
        req.queryFilter,
        {

            ...req.queryOptions,
            populate: ['branches']
        }
    );
    return APIResponse.Ok(res, tests);
});
