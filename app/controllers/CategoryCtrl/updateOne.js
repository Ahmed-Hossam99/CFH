const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");

module.exports = $baseCtrl(
  [{ name: "image", maxCount: 1 }],
  cloudinaryStorage,
  async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    const category = await models.category.findById(id);
    if (!category) return APIResponse.NotFound(res, "category not found");

    if (req.files && req.files["image"]) {
      req.body.image = req.files["image"][0].secure_url;
    }

    await category.set(req.body).save();

    return APIResponse.Ok(res, category);
  }
);
