const $baseCtrl = require('../$baseCtrl')
const models = require('../../models')
const { APIResponse } = require('../../utils')
const bcrypt = require("bcryptjs");
const cloudinaryStorage = require("../../services/cloudinaryStorage");

module.exports = $baseCtrl(
    [{ name: "photo", maxCount: 1 }],
    cloudinaryStorage,
    async (req, res) => {
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
        let user;

        if (req.body.phone) {
            user = await models._user.findOne({
                phone: req.body.phone

            });
        }
        else {
            user = await models._user.findOne({
                email: req.body.email,
            });
        }
        if (user) {
            console.log(user)
            return res.status(400).json({ flag: 1001 });
        }
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
        req.body.enabled = true;
        req.body.role = 'client';
        //upload image by user 
        if (req.files && req.files["photo"]) {
            req.body.photo = req.files["photo"][0].secure_url;
        }
        const newClient = await new models.client(req.body).save()
        return APIResponse.Created(res, newClient)
    })
