const jwt = require("jsonwebtoken");
const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");

module.exports = $baseCtrl(
  [{ name: "photo", maxCount: 1 }],
  cloudinaryStorage,
  async (req, res) => {
    const authUser = req.authenticatedUser;
    const user = await models._user.findById(authUser.id);
    // Upload photo if enter by user
    if (req.files && req.files["photo"]) {
      req.body.photo = req.files["photo"][0].secure_url;
    } else {
      delete req.body.photo;
    }
    delete req.body.password;
    delete req.body.phone;
    delete req.body.role;
    delete req.body.pushTokens;
    // save user to db
    await user.set(req.body).save();
    const response = {
      user,
    };

    return APIResponse.Created(res, response);
  }
);
