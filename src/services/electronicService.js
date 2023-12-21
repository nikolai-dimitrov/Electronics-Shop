const Electronic = require("../models/Electronic");
exports.create = (data) => Electronic.create(data);
exports.edit = (electronicId, newData) =>
  Electronic.findByIdAndUpdate(electronicId, newData, { runValidators: true });
exports.delete = (electronicId) => Electronic.findByIdAndDelete(electronicId);
exports.getOne = (electronicId) => Electronic.findById(electronicId);
exports.getAll = () => Electronic.find({});
exports.isOwner = async (electronicId, userId) => {
  const electronic = await this.getOne(electronicId).lean();
  return electronic.owner._id == userId ? true : false;
};
exports.hasAlreadyBought = async (electronicId, userId) => {
  return (await Electronic.findById(electronicId)
    .where("buyingList")
    .in(userId))
    ? true
    : false;
};
exports.buy = async (electronicId, userId) => {
  let electronic = await Electronic.findById(electronicId);
  electronic.buyingList.push(userId);
  electronic.save();
};

exports.getQueriedElectronics = (queryParams) => {
  let defaultQueryParams = {
    name: "(.*?)",
    type: "(.*?)",
  };
  // Modify query params.
  Object.entries(queryParams)
    .filter((el) => el[1] != "")
    .map((el) => (defaultQueryParams[el[0]] = el[1]));
  //Db query
  let filteredGames = Electronic.find({
    name: { $regex: defaultQueryParams.name, $options: "i" },
    type: { $regex: defaultQueryParams.type, $options: "i" },
  });

  return filteredGames;
};
