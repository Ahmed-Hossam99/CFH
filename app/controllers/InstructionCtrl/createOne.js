const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {
        const instruction = await new models.instruction(req.body).save();

        return APIResponse.Created(res, instruction);
    }
);
