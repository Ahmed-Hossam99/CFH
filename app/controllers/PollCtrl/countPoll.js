
const $baseCtrl = require('../$baseCtrl');
const models = require('../../models');
const { APIResponse } = require('../../utils');

module.exports = $baseCtrl(async (req, res) =>
{
    let count = await models.poll.countDocuments()
    return APIResponse.Ok(res, { totalDoc: count });

})