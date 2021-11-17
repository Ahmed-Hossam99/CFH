const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");

module.exports = $baseCtrl(
    [
        { name: "image", maxCount: 20 },
        { name: "pdf", maxCount: 10 },
    ],
    cloudinaryStorage,
    async (req, res) => {
        //[TODO] update files is done in imageCtrl in createMany file
        const id = parseInt(req.params.id);
        if (isNaN(id)) return APIResponse.NotFound(res);
        const result = await models.result.findById(id);
        if (!result) return APIResponse.NotFound(res, "No result With That Id");
        delete req.body.subject;
        delete req.body.subjectType;
        delete req.body.client;
        await result.set(req.body).save();

        return APIResponse.Ok(res, result);
    });

