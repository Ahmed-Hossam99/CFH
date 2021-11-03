const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {
        const id = req.params.id
        if (isNaN(id)) return APIResponse.NotFound(res)
        const region = await models.region.findById(id)
        if (!region) return APIResponse.NotFound(res, 'no region with that id ')
        req.body.region = id
        req.body.city = region.city

        const branch = await new models.branch(req.body).save();

        return APIResponse.Created(res, branch);
    }
);
