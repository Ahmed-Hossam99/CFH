const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const { escapeRegExp } = require("lodash");

module.exports = $baseCtrl(async (req, res) => {
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
    let routePath = req.route.path.split('/')
    let type = routePath[1] === "tests" ? "test" : routePath[1] === "packages" ? "package" : "offer";
    const products = await models[type].fetchAll(
        req.allowPagination,
        req.queryFilter,
        {

            ...req.queryOptions,
            populate: ['tests', 'branches']
        }
    );
    return APIResponse.Ok(res, products);
});
