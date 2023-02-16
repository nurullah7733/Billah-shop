const userUpdateService = async (Request, DataModel) => {
  let id = Request.params.id;
  let reqBody = Request.body;
  let isAdmin = Request.headers.isAdmin;
  let email = Request.headers.email;
  console.log(isAdmin);
  console.log(email);
  console.log(id);
  try {
    if (isAdmin) {
      let data = await DataModel.updateOne({ _id: id }, reqBody);
      console.log(data, "1");
      return { status: "success", data };
    } else {
      let data = await DataModel.updateOne({ _id: id, email: email }, reqBody);
      console.log(data, "2");
      return { status: "success", data };
    }
  } catch (error) {
    return { status: "fail", data: error };
  }
};

module.exports = userUpdateService;
