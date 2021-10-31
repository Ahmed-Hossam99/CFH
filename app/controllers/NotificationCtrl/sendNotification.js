const $baseCtrl = require("../$baseCtrl");
const { APIResponse } = require("../../utils");
const axios = require("axios");
const models = require("../../models");
const moment = require("moment");
// const fetch = require("node-fetch");
const bcrypt = require("bcryptjs");
const CodeGenerator = require("node-code-generator");
const generator = new CodeGenerator();

module.exports = $baseCtrl(async (req, res) => {
  // if (process.env.NODE_ENV !== "development") {
  //   return APIResponse.Forbidden(res);
  // }
  let id = parseInt(req.body.userId) || 96;
  let user = await models._user.findById(id);
  await user.sendNotification({
    notification: {
      title: req.body.title || "TEST",
      body: req.body.body || "TEST BODY",
    },
    webpush: {
      notification: {
        icon: "https://bassthalk.ams3.digitaloceanspaces.com/cfed9a693f5a2d63/1633735058640/WhatsApp%20Image%202021-10-08%20at%2012.47.47%20AM.jpeg",
        click_action:
          "https://bassthalk.ams3.digitaloceanspaces.com/cfed9a693f5a2d63/1633735058640/WhatsApp%20Image%202021-10-08%20at%2012.47.47%20AM.jpeg",
      },
    },
    data: {
      ...req.body.data,
      test: "TEST",
      click_action: "FLUTTER_NOTIFICATION_CLICK",
    },
  });
  return APIResponse.NoContent(res);
});
