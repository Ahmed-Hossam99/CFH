const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");
module.exports = $baseCtrl(
    [{ name: "icon", maxCount: 1 }],
    cloudinaryStorage,
    async (req, res) => {

        if (req.files && req.files["icon"]) {
            req.body.icon = req.files["icon"][0].secure_url;
        }
        const branchs = await models.branch.find({ _id: { $in: req.body.branches } });

        const testBranchs = branchs.map(
            (_branch) => _branch.id);
        req.body.branches = testBranchs
        const test = await new models.test(req.body).save();
        return APIResponse.Created(res, test);
    }
);
