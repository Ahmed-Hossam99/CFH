const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");

module.exports = $baseCtrl(
    [
        { name: "image", maxCount: 1 },
        { name: "icon", maxCount: 1 }
    ],
    cloudinaryStorage,
    async (req, res) => {
        let routePath = req.route.path.split('/')
        let type = routePath[1] === "tests" ? "test" : routePath[1] === "packages" ? "package" : "offer";
        const id = parseInt(req.params.id);
        if (isNaN(id)) return APIResponse.NotFound(res);
        const product = await models[type].findById(id);
        if (!product) return APIResponse.NotFound(res, "No product With That Id");


        if (req.body.branches) {
            const branchs = await models.branch.find({ _id: { $in: req.body.branches } });
            const typeBranchs = branchs.map(
                (_branch) => _branch.id);
            for (let i = 0; i < typeBranchs.length; i++) {
                const branch = typeBranchs[i]
                if (product.branches.indexOf(branch) == -1) {
                    product.branches.push(branch)
                }
            }
        }
        if (req.body.tests) {
            const tests = await models.test.find({ _id: { $in: req.body.tests } });
            const typetests = tests.map(
                (_test) => _test.id);
            for (let i = 0; i < typetests.length; i++) {
                const test = typetests[i]
                if (product.tests.indexOf(test) == -1) {
                    product.tests.push(test)
                }
            }
        }
        if (req.files && req.files['image']) {
            req.body.image = req.files['image'][0].secure_url;
        }
        if (req.files && req.files['icon']) {
            req.body.icon = req.files['icon'][0].secure_url;
        }
        await product.set(req.body).save();

        return APIResponse.Ok(res, product);
    });

