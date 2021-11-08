const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const test = await models.test.findById(id);
    if (!test) return APIResponse.NotFound(res, "No test With That Id");
    if (req.body.branches) {
        const branchs = await models.branch.find({ _id: { $in: req.body.branches } });
        const testBranchs = branchs.map(
            (_branch) => _branch.id);
        for (let i = 0; i < testBranchs.length; i++) {
            const branch = testBranchs[i]
            if (test.branches.indexOf(branch) == -1) {
                test.branches.push(branch)
            }
        }
    }
    if (req.body.files && req.files['icon']) {
        req.body.icon = req.files['icon'][0].secure_url;
    }
    await test.set(req.body).save();

    return APIResponse.Ok(res, test);
});
