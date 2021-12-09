const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");
module.exports = $baseCtrl(
    [
        { name: "pdf", maxCount: 3 },
        { name: "images", maxCount: 20 }
    ],
    cloudinaryStorage,
    async (req, res) => {
        const id = parseInt(req.body.subject);
        if (isNaN(id)) return APIResponse.NotFound(res);
        const user = req.authenticatedUser;

        const subjectType = req.body.subjectType; //order , user
        console.log(subjectType)

        let objectType = subjectType === 'order' ? '_order' : '_user'
        const doc = await models[objectType].findById(id)

        if (subjectType === "order") {
            req.body.client = doc.client;
        } else
            req.body.client = doc._id;


        const newresult = await new models.result(req.body).save();
        if (subjectType === "order") {
            doc.result = newresult._id
            doc.status = 'done'
            await doc.save()
            const notification = await new models.notification({
                title:'Your order has been deleverd',
                body: `Order #${doc.id} has been deleverd`,
                titleAr: 'تم رفع نتيجة الطلب الخاص بك',
                bodyAr: `طلبك رقم ${doc.id} تم رفع نتيجه`,
                user: user.id,
                receiver: doc.client,
                subjectType: 'result',
                subject: newresult._id,
            }).save();
            // console.log(notification);
            const receiver = await models._user.findOne({
                _id: doc.client,
            });
            await receiver.sendNotification(notification.toFirebaseNotification());
        
        }

        return APIResponse.Created(res, newresult);

    }
);
