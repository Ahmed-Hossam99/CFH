const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {
        if (req.me.role !== 'admin') return APIRespons.Unauthorized(res, "don't allow to do this action")
        const topic = await new models.city(req.body).save();

        return APIResponse.Created(res, topic);
    }
);
