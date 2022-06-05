const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) =>
    {
        const question = await new models.question(req.body).save();

        return APIResponse.Created(res, question);
    }
);
