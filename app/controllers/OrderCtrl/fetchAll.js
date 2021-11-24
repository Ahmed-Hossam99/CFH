const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const moment = require('moment');
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {

    const user = req.authenticatedUser;
    // // prepare pagination options
    // const limit = req.queryOptions.limit;
    // const page = req.queryOptions.page;
    // const skip = limit * (page - 1);
    // let stages = [
    //     {
    //         $match: {

    //             ...(user.role === 'client') && {
    //                 client: user.id
    //             },
    //             ...(user.role === 'admin') && req.query.phone && {
    //                 phone: req.query.phone
    //             },
    //             ...(user.role === 'admin') && req.query.from && req.query.to && {
    //                 day: {
    //                     $gte: moment(req.query.from).utc().startOf('d').toDate(),
    //                     $lt: moment(req.query.to).utc().endOf('d').toDate()
    //                 }

    //             },

    //             ...(user.role === 'admin') && req.query.day && {
    //                 day: req.query.day
    //             },

    //         },
    //     },
    //     // {
    //     //     $addFields: {
    //     //         day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
    //     //     },
    //     // },
    //     {
    //         $lookup: {
    //             from: "products",
    //             localField: "products",
    //             foreignField: "_id",
    //             as: "products",
    //         },
    //     },
    //     // {
    //     //     $lookup: {
    //     //         from: "users",
    //     //         localField: "client",
    //     //         foreignField: "_id",
    //     //         as: "client",
    //     //     },
    //     // },
    //     // // {
    //     // //     $unwind: "$subject",
    //     // // },
    //     // {
    //     //     $unwind: "$client",
    //     // },
    //     // // {
    //     // //     $project: {
    //     // //         "addedBy.username": 1,
    //     // //         "addedBy.photo": 1,
    //     // //         "subject.nameAr": 1,
    //     // //         "subject.nameEn": 1,
    //     // //         notes: 1,
    //     // //         day: { $toDate: "$day" },
    //     // //     },
    //     // // },
    //     // // {
    //     // //     $group: {
    //     // //         _id: "$day",
    //     // //         tasks: {
    //     // //             $push: {
    //     // //                 id: "$_id",
    //     // //                 notes: "$notes",
    //     // //                 addedBy: "$addedBy",
    //     // //                 subject: "$subject",
    //     // //             },
    //     // //         },
    //     // //     },
    //     // // },
    //     // {
    //     //     $sort: {
    //     //         _id: -1,
    //     //     },
    //     // },
    //     // {
    //     //     $addFields: {
    //     //         _id: "$$REMOVE",
    //     //         page,
    //     //         limit,
    //     //         skip,
    //     //         totalPages: {
    //     //             $ceil: {
    //     //                 $divide: ["$totalDocs", limit],
    //     //             },
    //     //         },
    //     //     },
    //     // }
    // ];
    // orders = await models._order.aggregate(stages);
    // orders = orders[0]
    //     ? orders[0]
    //     : {
    //         docs: [],
    //         totalDocs: 0,
    //         limit: 10,
    //         page: 1,
    //         totalPages: 1,
    //         isEmpty: true,
    //     };


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
    if (req.query.day) {
        query.day = {
            $eq: moment.utc(req.query.day).startOf('d').toDate(),
        }
        delete req.queryFilter.day //to delete it from queryFilter 
    }
    console.log(query)
    // console.log(req.queryFilter)

    const orders = await models._order.fetchAll(
        req.allowPagination,
        {

            ...req.queryFilter,
            ...query
        },
        {

            ...req.queryOptions,
            populate: [
                { path: 'products', populate: { path: 'tests' } },
                { path: 'offers', populate: { path: 'tests' } }
            ]
        }
    );
    return APIResponse.Ok(res, orders);
});
