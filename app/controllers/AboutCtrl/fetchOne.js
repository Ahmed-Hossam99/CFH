const $baseCtrl = require('../$baseCtrl');
const models = require('../../models');
const { APIResponse } = require('../../utils');

module.exports = $baseCtrl(async (req, res) => {
    let about = await models.about.findOne();
    if (!about) return APIResponse.NotFound(res, 'No socail provided');
    return APIResponse.Ok(res, about);
});