const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const moment = require('moment');
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {

    const user = req.authenticatedUser;
    let query = {};
    if (user.role === 'client') query.client = user.id;

    if (req.query.from && req.query.to) {
        query.day = {
            $gte: moment(req.query.from).utc().startOf('d').toDate(),
            $lt: moment(req.query.to).utc().endOf('d').toDate()
        }
        delete req.queryFilter.from //to delete it from queryFilter 
        delete req.queryFilter.to
    }
    if (req.query.phone) {
        query.phone = req.query.phone
        delete req.queryFilter.phone //to delete it from queryFilter 
    }
    // console.log(query)
    // console.log(req.queryFilter)

    const orders = await models._order.fetchAll(
        req.allowPagination,
        {

            ...req.queryFilter,
            ...query
        },
        {

            ...req.queryOptions,
            populate: ['products']
        }
    );
    return APIResponse.Ok(res, orders);
});
