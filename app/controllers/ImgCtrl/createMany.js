const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");

module.exports = $baseCtrl(
    [
        { name: "pdf" },
        { name: "images" }
    ],
    cloudinaryStorage,
    async (req, res) => {
        let photos = [];
        if (req.files && req.files["image"]) {
            for (let i = 0; i < req.files["image"].length; i++) {
                photos.push(req.files['image'][i].secure_url)
            }
        } else if (req.files && req.files["pdf"]) {
            photos.push(req.files["pdf"][0].secure_url);
        } else
            return APIResponse.BadRequest(res, "No Files Uploaded");

        return APIResponse.Ok(res, photos);
    }
);