const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");


module.exports = $baseCtrl(
  [{ name: "image", maxCount: 1 }],
  cloudinaryStorage,
  async (req, res) => {
    const branchs = await models.branch.find({ _id: { $in: req.body.branches } });
    console.log(branchs)
    const adsBranchs = branchs.map(
      (_branch) => _branch.id);
    req.body.branches = adsBranchs
    if (req.files && req.files['image']) {
      req.body.image = req.files['image'][0].secure_url;
    }
    const ads = await new models.ads(req.body).save();

    return APIResponse.Created(res, ads);

  }
);