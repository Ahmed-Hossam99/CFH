const jwt = require("jsonwebtoken");
const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");

module.exports = $baseCtrl(
  [{ name: "photo", maxCount: 1 }],
  cloudinaryStorage,
  async (req, res) => {
    const authUser = req.me;
    if (req.files && req.files["photo"]) {
      req.body.photo = req.files["photo"][0].secure_url;
    }



    let existingUser
    if (req.body.phone) {
      existingUser = await models._user.findOne({
        phone: req.body.phone,
      });
    }
    if (req.body.email) {
      existingUser = await models._user.findOne({
        email: req.body.email,
      });
    }


    if (existingUser) {
      return res.status(400).json({ flag: 1001 });
    }

    if (req.body.city) {
      cId = await models.city.findById(req.body.city)
      if (!cId) return APIResponse.NotFound(res, 'no city with that id ')
      authUser.city = cId.id
    }
    if (req.body.region) {
      rId = await models.region.findById(req.body.region)
      if (!rId) return APIResponse.NotFound(res, 'no region with that id ')
      if (req.body.city !== rId.city && authUser.city !== rId.city)
        return APIResponse.BadRequest(res, 'region not affiliated with this city ')
      authUser.region = rId.id
    }
    delete req.body.password;
    delete req.body.role;
    delete req.body.pushTokens;
    // save user to db
    await authUser.set(req.body).save();
    const response = {
      authUser,
    };
    return APIResponse.Created(res, response);
  }
);
