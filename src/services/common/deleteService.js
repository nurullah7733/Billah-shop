const { default: mongoose } = require("mongoose");

const deleteService = async (Request, DataModel) => {
  let id = Request.params.id;
  let objectId = mongoose.Types.ObjectId;
  let query = {};
  query._id = objectId(id);

  try {
    let data = await DataModel.deleteMany(query);
    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = deleteService;
