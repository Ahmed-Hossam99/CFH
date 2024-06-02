const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const moment = require('moment');
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {

    const user = req.authenticatedUser;
    // prepare pagination options with aggrigation 
    const limit = req.queryOptions.limit;
    const page = req.queryOptions.page;
    const skip = limit * (page - 1);
    let filtersquery = {
        ...(user.role == 'client' && {
            client: user.id,
        }),
    }

    let orderDocs = await models._order.aggregate([
        { $match: filtersquery },
        {
            $sort: {
                _id: -1
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "client",
                foreignField: "_id",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            photo: 1,
                            username: 1,
                        }
                    }
                ],

                as: "client",
            },
        },
        {
            $unwind: "$client",
            // $preserveNullAndEmptyArrays: false,
        },
        {
            $facet: {
                totalDocs: [{ $count: 'count' }],
                docs: req.queryOptions.paginate == true ? [skip, limit] : [],
            },
        },
        {
            $project: {
                totalDocs: { $first: '$totalDocs.count' },
                docs: 1,
            },
        },
        {
            $addFields: {
                paginationMeta: {
                    _id: '$$REMOVE',
                    page: page == false ? null : page,
                    limit: limit == false ? null : limit,
                    skip: req.queryOptions.paginate == false ? null : skip,
                    totalDocs: '$totalDocs',
                    totalPages: {
                        $ceil: {
                            $divide: [
                                '$totalDocs',
                                req.queryOptions.paginate == false ? null : limit,
                            ],
                        },
                    },
                },
            },
        },
        {
            $project: {
                totalDocs: 0,
            },
        },
    ])


    // let query = {};
    // if (user.role === 'client') query.client = user.id;

    // if (req.query.from && req.query.to) {
    //     query.day = {
    //         $gte: moment(req.query.from).utc().startOf('d').toDate(),
    //         $lt: moment(req.query.to).utc().endOf('d').toDate()
    //     }
    //     delete req.queryFilter.from //to delete it from queryFilter 
    //     delete req.queryFilter.to
    // }
    // if (req.query.phone) {
    //     query.phone = req.query.phone
    //     delete req.queryFilter.phone //to delete it from queryFilter 
    // }
    // if (req.query.day) {
    //     query.day = {
    //         $eq: moment.utc(req.query.day).startOf('d').toDate(),
    //     }
    //     delete req.queryFilter.day //to delete it from queryFilter 
    // }
    // console.log(query)
    // // console.log(req.queryFilter)

    // // const orders = await models._order.fetchAll(
    // //     req.allowPagination,
    // //     {

    // //         ...req.queryFilter,
    // //         ...query
    // //     },
    // //     {

    // //         ...req.queryOptions,
    // //         populate: [
    // //             { path: 'products', populate: { path: 'tests' } },
    // //             { path: 'offers', populate: { path: 'tests' } }
    // //         ]
    // //     }
    // // );
    return APIResponse.Ok(res, orderDocs[0]);
});
