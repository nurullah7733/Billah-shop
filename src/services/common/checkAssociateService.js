const checkAssociateService = async (Request, queryObject, DataModel) => {
  let email = Request.headers.email;

  queryObject.email = email;

  try {
    let data = await DataModel.aggregate([{ $match: queryObject }]);
    return data.length > 0;
  } catch (error) {
    return false;
  }
};

module.exports = checkAssociateService;
