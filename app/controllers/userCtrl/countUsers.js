
const $baseCtrl = require('../$baseCtrl');
const models = require('../../models');
const { APIResponse } = require('../../utils');

module.exports = $baseCtrl(async (req, res) =>
{
    // let query = {
    //     ...(req.query.status && { status: req.query.status, }),
    // }

    let count = await models._user.countDocuments()
    return APIResponse.Ok(res, { totalDoc: count });

})