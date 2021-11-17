const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");
module.exports = $baseCtrl(
    [
        { name: "pdf", maxCount: 3 },
        { name: "images", maxCount: 20 }
    ],
    cloudinaryStorage,
    async (req, res) => {
        const id = parseInt(req.body.subject);
        if (isNaN(id)) return APIResponse.NotFound(res);
        const subjectType = req.body.subjectType; //order , user
        console.log(subjectType)

        let objectType = subjectType === 'order' ? '_order' : '_user'
        const doc = await models[objectType].findById(id)

        if (subjectType === "order") {
            req.body.client = doc.client;
        } else
            req.body.client = doc._id;


        const newresult = await new models.result(req.body).save();
        if (subjectType === "order") {
            doc.result = newresult._id
            doc.status = 'done'
            await doc.save()
        }
        return APIResponse.Created(res, newresult);

    }
);
