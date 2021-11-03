const $baseCtrl = require('../$baseCtrl');
const models = require('../../models');
const { APIResponse } = require('../../utils');

module.exports = $baseCtrl(async (req, res) => {
    const id = req.params.id
    if (isNaN(id)) return APIResponse.NotFound(res)
    if (req.me.role !== 'admin') return APIRespons.Unauthorized(res, "not allow  to you")
    const region = await models.region.findById(id)
    if (!region) return APIResponse.NotFound(res, 'no region with that id ')
    const branches = await models.branch.fetchAll(

        req.allowPagination,
        {
            ...req.queryFilter,
            region: id

        },
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