const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");
module.exports = $baseCtrl(
    [
        { name: "image" },
        { name: "icon" }
    ],
    cloudinaryStorage,
    async (req, res) => {
        let routePath = req.route.path.split('/')
        let type = routePath[1] === "add-tests" ? "test" : routePath[1] === "packages" ? "package" : "offer";
        console.log(routePath[1])

        // handel brnches
        const branchs = await models.branch.find({ _id: { $in: req.body.branches } });
        const typeBranchs = branchs.map(
            (_branch) => _branch.id);
        req.body.branches = typeBranchs

        if (req.files && req.files["image"]) {
            req.body.image = req.files["image"][0].secure_url;
        }
        if (req.files && req.files["icon"]) {
            req.body.icon = req.files["icon"][0].secure_url;
        }

        // handel package && offer tests
        if (type === 'package' || type === 'offer') {

            const tests = await models.test.find({ _id: { $in: req.body.tests } });
            const typeTests = tests.map(
                (test) => test.id);
            req.body.tests = typeTests
        }
        const newProduct = await new models[type](req.body).save();
        return APIResponse.Created(res, newProduct);
    }
);
