const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");
module.exports = $baseCtrl(
    [{ name: "image", maxCount: 1 }],
    cloudinaryStorage,
    async (req, res) => {


        let about = await models.about.findOne();
        if (req.files && req.files['image']) {
            req.body.image = req.files['image'][0].secure_url;
        }
        if (about) {
            await about.set(req.body).save();
        } else {
            about = await new models.about(req.body).save();
        }

        return APIResponse.Created(res, about);
    }
);
