const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");


module.exports = $baseCtrl(
    async (req, res) =>
    {

        req.body.name = req.me.username
        req.body.phone = req.me.phone

        const poll = await new models.poll(req.body).save();

        return APIResponse.Created(res, poll);

    }
);