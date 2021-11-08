const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const offers = await models.offer.fetchAll(
        req.allowPagination,
        req.queryFilter,
        {

            ...req.queryOptions,
            populate: ['tests']
        }
    );
    return APIResponse.Ok(res, offers);
});
