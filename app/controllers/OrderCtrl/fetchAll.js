const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const moment = require('moment');
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    let startOfToday = moment.utc().startOf('d');
    const user = req.authenticatedUser;
    let query = {
        ...(req.query.today && { createdAt: { $gte: startOfToday } }),
    };
    if (user.role === 'client') query.client = user.id;


    const orders = await models._order.fetchAll(
        req.allowPagination,
        {

            ...req.queryFilter,
            ...query
        },
        {

            ...req.queryOptions,
            // populate: ['tests']
        }
    );
    return APIResponse.Ok(res, orders);
});
