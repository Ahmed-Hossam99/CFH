const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");
module.exports = $baseCtrl(
    [{ name: "image", maxCount: 1 }],
    cloudinaryStorage,
    async (req, res) => {

        if (req.files && req.files["image"]) {
            req.body.image = req.files["image"][0].secure_url;
        }
        const branchs = await models.branch.find({ _id: { $in: req.body.branches } });

        const packageBranchs = branchs.map(
            (_branch) => _branch.id);
        req.body.branches = packageBranchs

        const tests = await models.test.find({ _id: { $in: req.body.tests } });

        const offerTests = tests.map(
            (test) => test.id);
        req.body.tests = offerTests

        const offer = await new models.offer(req.body).save();
        return APIResponse.Created(res, offer);
    }
);
