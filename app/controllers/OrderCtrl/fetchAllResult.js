const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const moment = require('moment');
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
    const user = req.authenticatedUser;

    let stages = [
        {
            $match: {
                ...(req.me.role === 'admin' && req.query.client
                    && {
                    client: parseInt(req.query.client),

                }),
                ...(req.me.role === 'admin' && req.query.today && {
                    createdAt: { $gte: moment.utc().startOf('d').toDate(), },

                }),
                ...(req.me.role === 'admin' && req.query.from &&
                    req.query.to && {
                    createdAt: {
                        $gte: moment(req.query.from).utc().startOf('d').toDate(),
                        $lt: moment(req.query.to).utc().endOf('d').toDate()
                    },

                }),

                ...(req.me.role === 'admin' && req.query.subjectType && {
                    subjectType: req.query.subjectType,
                }),
                ...(req.me.role === 'client' && req.query.today && {
                    client: req.me.id,
                    createdAt: { $gte: moment.utc().startOf('d').toDate(), },

                }),
                ...(req.me.role === "client" && {
                    client: req.me.id,
                }),

            },
        },

        {
            $addFields: {
                day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            },
        },
        {
            $group: {
                _id: "$day",
                docs: {
                    $push: {
                        id: "$_id",
                        client: "$client",
                        titleEn: "$titleEn",
                        titleAr: "$titleAr",
                        subjectType: "$subjectType",
                        images: "$images",
                        attachment: "$attachment",
                        createdAt: "$createdAt",
                    },
                },
            },
        },
        {
            $sort: {
                _id: -1,
            },
        },
    ];
    console.log(stages)
    let results = await models.result.aggregate(stages);









    //=========================================================

    // const user = req.authenticatedUser;
    // let query = {};
    // if (user.role === 'client') query.client = user.id;
    // if (req.query.today) {
    //     query.createdAt = { $gte: moment.utc().startOf('d').toDate(), }
    //     delete req.queryFilter.today

    // }
    // if (req.query.from && req.query.to) {
    //     query.createdAt = {
    //         $gte: moment(req.query.from).utc().startOf('d').toDate(),
    //         $lt: moment(req.query.to).utc().endOf('d').toDate()
    //     }
    //     delete req.queryFilter.from //to delete it from queryFilter 
    //     delete req.queryFilter.to
    // }
    // console.log(query)
    // console.log(req.queryFilter)

    // const results = await models.result.fetchAll(
    //     req.allowPagination,
    //     {

    //         ...req.queryFilter,
    //         ...query
    //     },
    //     {

    //         ...req.queryOptions,
    //         populate: [
    //             'subject', 'client']
    //     }
    // );
    return APIResponse.Ok(res, results);
});
