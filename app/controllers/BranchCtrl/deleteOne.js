const $baseCtrl = require('../$baseCtrl');
const models = require('../../models');
const { APIResponse } = require('../../utils');

module.exports = $baseCtrl(async (req, res) => {
    if (req.me.role !== 'admin')
        return APIRespons.Unauthorized(res, "don't allow to do this action")

    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);
    // fetch specific citys by id
    const branch = await models.branch.findById(id);
    if (!branch) return APIResponse.NotFound(res, "NO branch With That Id");
    // delete related data here 
    await branch.delete();

    return APIResponse.NoContent(res);
})