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
        const team = await new models.team(req.body).save();

        return APIResponse.Created(res, team);
    }
);
