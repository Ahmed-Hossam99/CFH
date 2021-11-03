const $baseCtrl = require('../$baseCtrl');
const models = require('../../models');
const { APIResponse } = require('../../utils');

module.exports = $baseCtrl(async (req, res) => {
    const branches = await models.branch.fetchAll(
        req.allowPagination,
        req.queryFilter,
        {
            ...req.queryOptions,
            populate: ["region", "city"]
            // {
            //     path: "region",
            //     populate: {
            //         path: 'city', select: 'nameAr nameEn'
            //     }

            // }
        }
    );
    return APIResponse.Ok(res, branches);

})