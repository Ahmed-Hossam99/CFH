const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const { escapeRegExp } = require("lodash");

module.exports = $baseCtrl(async (req, res) =>
{
    let query = {}
    if (req.query.titleAr)
    {
        req.queryFilter['titleAr'] = new RegExp(
            escapeRegExp(req.query.titleAr),
            "i")
    }
    if (req.query.titleEn)
    {
        req.queryFilter['titleEn'] = new RegExp(
            escapeRegExp(req.query.titleEn),
            "i")
    }
    if (req.query.hasOffer === 'true')
    {
        console.log('here')
        query.priceAfterDiscount = { $exists: true, $gt: 0 }
        delete req.queryFilter.hasOffer //to delete it from queryFilter 
    }
    console.log(query)
    let routePath = req.route.path.split('/')
    let type = routePath[1] === "tests" ? "test" : routePath[1] === "packages" ? "package" : "offer";
    const products = await models[type].fetchAll(
        req.allowPagination,
        {

            ...req.queryFilter,
            ...query
        },
        {

            ...req.queryOptions,
            populate: ['tests', 'branches']
        }
    );
    return APIResponse.Ok(res, products);
});
