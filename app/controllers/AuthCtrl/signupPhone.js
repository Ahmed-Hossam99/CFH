const jwt = require("jsonwebtoken");
const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const bcrypt = require("bcryptjs");
const cloudinaryStorage = require("../../services/cloudinaryStorage");
// const smsService = require("../../services/sms");

module.exports = $baseCtrl(
  [{ name: "photo", maxCount: 1 }],
  cloudinaryStorage,
  async (req, res) => {
    // Check if values not entered
    if (
      req.body.username === undefined ||
      req.body.password === undefined ||
      req.body.phone === undefined
    ) {
      return APIResponse.BadRequest(
        res,
        "username/password/phone are required"
      );
    }

    // if (!req.body.phone.match(/^\+201[0125][0-9]{8}$/))
    //   return APIResponse.BadRequest(res, "Phone is invailed");

    // Check if phone Already Exist
    let existPhone = await models._user.findOne({ phone: req.body.phone });
    if (existPhone) {
      return res.status(400).json({ flag: 1001 });
    }

    // try {
    //   await smsService.sendVerificationCode(req.body.phone);
    //   console.log("Code Sent Successfully .");
    // } catch (error) {
    //   console.log(error);
    //   return APIResponse.ServerError(res, error);
    // }

    // Encrypt Password
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;

    // Upload photo if enter by user
    if (req.files && req.files["photo"]) {
      req.body.photo = req.files["photo"][0].secure_url;
    }

    // save user to db
    const newClient = await new models.client(req.body).save();

    const payload = {
      userId: newClient.id,
      userRole: newClient.role,
      enabled: newClient.enabled,
    };
    const options = {};
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);

    const response = {
      token: token,
      user: newClient,
    };

    return APIResponse.Created(res, response);
  }
);
