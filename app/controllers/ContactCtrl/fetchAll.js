const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const moment = require('moment');

module.exports = $baseCtrl(async (req, res) => {
    let query = {};

    if (req.query.from && req.query.to) {
        query.createdAt = {
            $gte: moment(req.query.from).utc().startOf('d').toDate(),
            $lt: moment(req.query.to).utc().endOf('d').toDate()
        }
        delete req.queryFilter.from
        delete req.queryFilter.to
    }
    if (req.query.status) {
        query.status = req.query.status
        delete req.queryFilter.status
    }
    const contacts = await models.contact.fetchAll(
        req.allowPagination,
        {

            ...req.queryFilter,
            ...query
        },
        req.queryOptions,

    );
    return APIResponse.Ok(res, contacts);
});
