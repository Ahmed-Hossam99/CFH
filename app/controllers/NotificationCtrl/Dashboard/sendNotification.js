// const $baseCtrl = require("../../$baseCtrl");
// const { APIResponse } = require("../../../utils");
// const { publishToChannel } = require("../../../RabbitMQ/utils");
// const models = require("../../../models");

// module.exports = $baseCtrl(async (req, res) => {
//   const classId = parseInt(req.body.class);
//   if (isNaN(classId)) return APIResponse.NotFound(res);
//   const _class = await models.class.findById(classId);
//   if (!_class) return APIResponse.NotFound(res, "class not found");
//   await publishToChannel(req.notificationChannel, {
//     routingKey: "notification",
//     exchangeName: "",
//     data: {
//       notificationsObjects: [
//         {
//           title: req.body.title,
//           body: req.body.body,
//           initiator: req.me.id,
//           subjectType: "user",
//           subject: req.me.id,
//           query: { class: classId },
//           click_action: `${process.env.STUDENT_BASE_URL}/dashboard`,
//           data: {},
//           sendPush: true,
//         },
//       ],
//       type: "user",
//     },
//   });

//   return APIResponse.NoContent(res);
// });
