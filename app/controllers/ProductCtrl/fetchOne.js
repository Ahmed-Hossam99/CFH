const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    let routePath = req.route.path.split('/')
    let type = routePath[1] === "tests" ? "test" : routePath[1] === "packages" ? "package" : "offer";
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const product = await models._product.findById(id).populate(['tests']);
    if (!product) return APIResponse.NotFound(res, "product not found");

    return APIResponse.Ok(res, product);
});
