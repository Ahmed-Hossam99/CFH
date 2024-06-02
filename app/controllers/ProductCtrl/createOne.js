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

        if (req.files && req.files["image"]) {
            req.body.image = req.files["image"][0].secure_url;
        }
        if (req.files && req.files["icon"]) {
            req.body.icon = req.files["icon"][0].secure_url;
        }

        // handel package && offer tests
        // if (type === 'package' || type === 'offer') {

        //     const tests = await models.product.find({ _id: { $in: req.body.tests } });
        //     const typeTests = tests.map(
        //         (test) => test.id);
        //     req.body.tests = typeTests
        // }
        const newProduct = await new models._product(req.body).save();
        return APIResponse.Created(res, newProduct);
    }
);
