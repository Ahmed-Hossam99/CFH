const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const { escapeRegExp } = require("lodash");

module.exports = $baseCtrl(async (req, res) => {
    let query = {}
    if (req.query.titleAr) {
        req.queryFilter['titleAr'] = new RegExp(
            escapeRegExp(req.query.titleAr),
            "i")
    }
    if (req.query.titleEn) {
        req.queryFilter['titleEn'] = new RegExp(
            escapeRegExp(req.query.titleEn),
            "i")
    }
    console.log(query)
    const products = await models._product.fetchAll(
        req.allowPagination,
        {

            ...req.queryFilter,
            ...query
        },
        {

            ...req.queryOptions,
            //populate: ['category', ...... ] if we have any relation or referance field and need to populate data[populate = join or lookup] 
        }
    );
    return APIResponse.Ok(res, products);
});
