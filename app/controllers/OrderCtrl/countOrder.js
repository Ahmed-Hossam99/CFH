
const $baseCtrl = require('../$baseCtrl');
const models = require('../../models');
const { APIResponse } = require('../../utils');

module.exports = $baseCtrl(async (req, res) =>
{
    let query = {
        ...(req.query.status && { status: req.query.status, }),
    }
    console.log(query)
    let count = await models._order.countDocuments(query)
    return APIResponse.Ok(res, { totalDoc: count });

})