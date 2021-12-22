const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {

    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const order = await models._order.findById(id).populate(
        [ 
            "result",
            { path: 'products', populate: { path: 'tests' } },
            { path: "offers", populate: { path: "tests" } }
        ]);
    if (!order) return APIResponse.NotFound(res, "order not found");

    return APIResponse.Ok(res, order);
});
