const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {
        const topic = await new models.city(req.body).save();

        return APIResponse.Created(res, topic);
    }
);
