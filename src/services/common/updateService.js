const updateService = async (Request, DataModel) => {
  let id = Request.params.id || Request.body.id;
  let reqBody = Request.body;

  try {
    let data = await DataModel.updateOne({ _id: id }, reqBody);
    return { status: "success", data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

module.exports = updateService;
