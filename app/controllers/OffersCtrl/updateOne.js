const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const offer = await models.offer.findById(id);
    if (!offer) return APIResponse.NotFound(res, "No offer With That Id");
    if (req.body.branches) {
        const branchs = await models.branch.find({ _id: { $in: req.body.branches } });
        const testBranchs = branchs.map(
            (_branch) => _branch.id);
        for (let i = 0; i < testBranchs.length; i++) {
            const branch = testBranchs[i]
            if (offer.branches.indexOf(branch) == -1) {
                offer.branches.push(branch)
            }
        }
    }
    if (req.body.tests) {
        const tests = await models.test.find({ _id: { $in: req.body.tests } });
        const packagetests = tests.map(
            (_test) => _test.id);
        for (let i = 0; i < packagetests.length; i++) {
            const test = packagetests[i]
            if (package.tests.indexOf(test) == -1) {
                package.tests.push(test)
            }
        }
    }
    if (req.files && req.files['image']) {
        req.body.image = req.files['image'][0].secure_url;
    }
    await offer.set(req.body).save();

    return APIResponse.Ok(res, offer);
});

