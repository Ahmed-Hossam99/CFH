const $baseCtrl = require('../$baseCtrl');
const models = require('../../models');
const { APIResponse } = require('../../utils');

module.exports = $baseCtrl(async (req, res) =>
{
    const polls = await models.poll.fetchAll(
        req.allowPagination,
        req.queryFilter,
        {
            ...req.queryOptions,
            populate: //["region", "city"]
            {
                path: "answers",
                populate: {
                    path: 'question', select: 'questionAr '
                }

            },
        }
    );
    return APIResponse.Ok(res, polls);

})