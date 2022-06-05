module.exports = {
  _user: require("./users/_user.model"),
  admin: require("./users/admin.model"),
  client: require("./users/client.model"),
  notification: require("./notification.model"),
  category: require("./category.model"),
  city: require("./city.model"),
  region: require("./region.model"),
  branch: require("./branch.model"),
  topic: require("./topic.model"),
  _product: require("./products/_product.model"),
  package: require("./products/package.model"),
  test: require("./products/test.model"),
  offer: require("./products/offer.model"),
  ads: require("./advertisement.model"),
  contact: require("./contact.model"),
  instruction: require("./instruction.model"),
  about: require("./about.model"),
  team: require("./team.model"),
  result: require("./result.model"),
  _order: require("./order/_order.model"),
  orderOffer: require("./order/offer.model"),
  orderNormal: require("./order/normal.model"),
  question: require("./questions.model"),
  poll: require("./poll.model"),
};
