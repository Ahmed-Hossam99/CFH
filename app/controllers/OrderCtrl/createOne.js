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
        let routePath = req.route.path.split('/')
        let type = routePath[1] === "orders-normal" ? "orderNormal" : routePath[1] === "order-offer" ? "orderOffer" : "other";
        console.log(type)
        req.body.client = req.me.id
        const orderProducts = await models._product.find({ _id: { $in: req.body.products } });
        //validate type of order matching with product type 
        if (req.body.booking === 'external') { // in home 
            for (let i = 0; i < orderProducts.length; i++) {
                const product = orderProducts[i]
                if (product.availableAt === 'lab') {
                    return res.status(400).json({ flag: 1007 });

                }
            }
        }
        const productsIds = orderProducts.map(
            (_product) => _product.id);
        req.body.products = productsIds

        let photos = []
        if (req.files && req.files["images"]) {
            for (let i = 0; i < req.files["images"].length; i++) {
                photos.push(req.files['images'][i].secure_url)
            }
            req.body.images = photos
        }
        req.body.status = 'pending'
        const newOrder = await new models[type](req.body).save();
        return APIResponse.Created(res, newOrder);

    }
);
