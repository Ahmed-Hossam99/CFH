const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {
        req.body.status = 'unseen'
        const newContact = await new models.contact(req.body).save();

        return APIResponse.Created(res, newContact);
    }
);
