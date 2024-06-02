const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");
module.exports = $baseCtrl(
    [
        { name: "images", maxCount: 20 }
    ],
    cloudinaryStorage,
    async (req, res) => {
        const session = await models._order.startSession();
        session.startTransaction();
        try {
            req.body.client = req.me.id;
            const query = {
                _id:
                    typeof req.body.products == 'string'
                        ? req.body.products.product.id
                        : {
                            $in: req.body.products.map((object, _, __) => object.product.id),
                        }
            };

            const orderProducts = await models._product.aggregate([
                {
                    $match: query
                },
                {
                    $addFields: {
                        requestedQuantity: {
                            $reduce: {
                                input: req.body.products,
                                initialValue: 0,
                                in: {
                                    $cond: {
                                        if: {
                                            $eq: [
                                                "$$this.product.id",
                                                "$_id"
                                            ]
                                        },
                                        then: "$$this.product.quantity",
                                        else: "$$value"
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    $project: {
                        id: 1,
                        image: 1,
                        icon: 1,
                        requestedQuantity: 1,
                        price: 1,
                        quantity: 1,
                        titleEn: 1,
                        titleAr: 1,
                        descriptionAr: 1,
                        descriptionEn: 1,
                        isValidQuantity: {
                            $cond: {
                                if: { $gte: ["$quantity", "$requestedQuantity"] },
                                then: true,
                                else: false
                            }
                        },

                        totalPrice: {
                            $multiply: ["$requestedQuantity", "$price",]
                        }

                    }
                }
            ]);

            let productsExtendedObject = [];
            let finalPrice = 0;
            for (const item of orderProducts) {
                if (item.isValidQuantity == false)
                    return APIResponse.BadRequest(res, "invalid qty !!");
                finalPrice += item.totalPrice;
                productsExtendedObject.push({
                    product: {
                        id: item._id,
                        titleEn: item.titleEn,
                        titleAr: item.titleAr,
                        descriptionAr: item.descriptionAr,
                        descriptionEn: item.descriptionEn,
                        image: item.image,
                        icon: item.icon,
                        price: item.price,
                    },
                    quantity: item.requestedQuantity
                });

            }

            let orderLogDates = [{
                status: 'pending',
                date: new Date
            }];
            req.body.status = 'pending';
            req.body.statusDate = new Date;
            req.body.products = productsExtendedObject;
            req.body.OrderDates = orderLogDates;
            req.body.totalPrice = finalPrice;


            const newOrder = await new models._order(req.body).save({ session });

            let updatesOperation = req.body.products.map(object => ({
                updateOne: {
                    filter: {
                        _id: object.product.id,
                    },
                    update: {
                        $inc: {
                            quantity: object.quantity * -1
                        }
                    },
                    upsert: false,
                },
            }));

            const updatedProduct = await models._product.bulkWrite(updatesOperation, { session });

            await session.commitTransaction();
            session.endSession();

            return APIResponse.Created(res, newOrder);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error(error);
            return APIResponse.InternalServerError(res, "Transaction aborted due to an error.");
        }
    }

);
