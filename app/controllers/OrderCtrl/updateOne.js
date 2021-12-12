const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");

module.exports = $baseCtrl(
    [
        { name: "image", maxCount: 20 },
        { name: "pdf", maxCount: 10 },
    ],
    cloudinaryStorage,
    async (req, res) => {
        const user = req.authenticatedUser;
        const id = parseInt(req.params.id);
        if (isNaN(id)) return APIResponse.NotFound(res);
        const order = await models._order.findById(id);
        if (!order) return APIResponse.NotFound(res, "No order With That Id");
        let title, body, titleAr, bodyAr;
        // client side
        if (req.me.role === 'client') {
            // console.log(order.client)
            // console.log(req.me._id)
            if (order.client !== req.me._id) return res.status(403).json({ flag: 1010 });
            if (order.status !== 'pending') return res.status(400).json({ flag: 1008 });
            delete req.body.booking;
            delete req.body.status;
            delete req.body.timeAttendance;

            if (req.body.products) {
                const orderProducts = await models._product.find({ _id: { $in: req.body.products } });
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
            }
            if (req.body.date) {
                title = 'client change order date ';
                body = `Order #${order.id} date  has been changed to ${req.body.date}`;
                titleAr = 'تم تغير ميعاد الطلب الخاص بك';
                bodyAr = `طلبك رقم ${order.id} تم تغير ميعاد`;
            }
        }

        if (req.me.role === 'admin') {
            delete req.body.booking;
            delete req.body.username;
            delete req.body.client;
            delete req.body.phone;
            delete req.body.gender;
            delete req.body.age;
            if (req.body.status === "accepted") {
                title = "Your order has been accepted";
                body = `Order #${order.id} has been accepted`;
                titleAr = 'تم قبول الطلب الخاص بك';
                bodyAr = `طلبك رقم ${order.id} تم قبوله`;
                if (!req.body.timeAttendance)
                    return res.status(400).json({ flag: 10011 });
            }
            if (req.body.status === 'rejected') {
                title = 'Your order has been rejected';
                body = `Order #${order.id} has been rejected`;
                titleAr = 'تم رفض الطلب الخاص بك';
                bodyAr = `طلبك رقم ${order.id} تم رفضه`;
                if (!req.body.whyRejected)
                    return res.status(400).json({ flag: 1009 });
            }
            if (req.body.status === 'inProgress') {
                title = 'Your order has been deleverd';
                body = `Order #${order.id} has been deleverd`;
                titleAr = 'تم سحب عينة  الطلب الخاص بك';
                bodyAr = `طلبك رقم ${order.id}تم  تم سحب عينة `;
            }
            if (req.body.date) {
                title = 'admin change order date ';
                body = `Order #${order.id} date  has been changed to ${req.body.date}`;
                titleAr = 'تم تغيير تاريخ الطلب الخاص بك';
                bodyAr = `طلبك رقم ${order.id}تم تغيير تاريخ `;

            }
        }
        const notification = await new models.notification({
            title: title,
            body: body,
            titleAr: titleAr,
            bodyAr: bodyAr,
            user: user.id,
            receiver: order.client,
            subjectType: 'order',
            subject: order.id,
        }).save();
        // console.log(notification);
        const receiver = await models._user.findOne({
            _id: order.client,
        });
        await receiver.sendNotification(notification.toFirebaseNotification());
        await order.set(req.body).save();
        return APIResponse.Ok(res, order);
    });

