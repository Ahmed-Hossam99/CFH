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
    const ads = await models.ads.findById(id);
    if (!ads) return APIResponse.NotFound(res, "ads not found");

    if (req.files && req.files["image"]) {
      req.body.image = req.files["image"][0].secure_url;
    }
    if (req.body.branches) {
      console.log('here')
      const branchs = await models.branch.find({ _id: { $in: req.body.branches } });
      const adsBranchs = branchs.map(
        (_branch) => _branch.id);
      req.body.branches = adsBranchs
    }

    await ads.set(req.body).save();

    return APIResponse.Ok(res, ads);
  }
);
