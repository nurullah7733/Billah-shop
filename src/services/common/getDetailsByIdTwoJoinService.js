const { default: mongoose } = require("mongoose");

const getDetailsByIdTwoJoinService = async (
  Request,
  DataModel,
  joinStage1,
  joinStage2
) => {
  let id = Request.params.id;
  let objectId = mongoose.Types.ObjectId;
  let query = {};
  query._id = objectId(id);
  console.log(query);

  try {
    let data;

    data = await DataModel.aggregate([
      { $match: query },
      joinStage1,
      joinStage2,
    ]);

    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = getDetailsByIdTwoJoinService;
