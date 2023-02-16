const listOneJoinService = async (
  Request,
  DataModel,
  searchArray,
  joinStage1
) => {
  let pageNo = Number(Request.params.pageNo);
  let perPage = Number(Request.params.perPage);
  let searchKeyword = Request.params.searchKeyword;
  let skipRow = (pageNo - 1) * perPage;
  let email = Request.headers.email;

  try {
    let data;
    if (searchKeyword !== "0") {
      data = await DataModel.aggregate([
        { $match: { email: email } },
        joinStage1,
        { $match: { $or: searchArray } },
        {
          $facet: {
            total: [{ $count: "count" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    } else {
      data = await DataModel.aggregate([
        { $match: { email: email } },
        joinStage1,
        { $match: { $expr: { $ne: ["$events", []] } } },
        {
          $facet: {
            total: [{ $count: "count" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    }
    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = listOneJoinService;
