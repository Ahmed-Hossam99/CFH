const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {

    let routePath = req.route.path.split('/')
    let type = routePath[1] === "tests" ? "test" : routePath[1] === "packages" ? "package" : "offer";

    const products = await models[type].fetchAll(
        req.allowPagination,
        req.queryFilter,
        {

            ...req.queryOptions,
            //populate: ['tests']
        }
    );
    return APIResponse.Ok(res, products);
});
