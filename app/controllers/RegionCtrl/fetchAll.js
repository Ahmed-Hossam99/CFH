const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const id = req.params.id
    if (isNaN(id)) return APIResponse.NotFound(res)
    if (req.me.role !== 'admin') return APIRespons.Unauthorized(res, "not allow  to you")
    const city = await models.city.findById(id)
    if (!city) return APIResponse.NotFound(res, 'no city with that id ')
    const regions = await models.region.fetchAll(
        req.allowPagination,
        {

            ...req.queryFilter,
            city: id
        },
        {
            ...req.queryOptions,
            populate: ['city']
        }
    );
    return APIResponse.Ok(res, regions);
});
