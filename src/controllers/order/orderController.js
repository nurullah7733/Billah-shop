const orderModel = require("../../models/order/orderModel");
const orderProductsModel = require("../../models/order/orderProductsModel");
const createParentChildService = require("../../services/common/createParentChildService");
const getDetailsByIdTwoJoinService = require("../../services/common/getDetailsByIdTwoJoinService");
const getServiceById = require("../../services/common/getSerciceById");
const listTwoJoinService = require("../../services/common/listTwoJoinService");
const listTwoJoinServiceForGlobal = require("../../services/common/listTwoJoinServiceForGlobal");
const updateService = require("../../services/common/updateService");

exports.createOrder = async (req, res) => {
  let result = await createParentChildService(
    req,
    orderModel,
    orderProductsModel,
    "orderModelId"
  );
  return res.status(200).json(result);
};

// for admin
exports.getAllOrderForAdmin = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { orderId: searchRgx },
    {
      email: searchRgx,
    },
  ];
  let joinStage1 = {
    $lookup: {
      from: "products",
      localField: "products.productId",
      foreignField: "_id",
      as: "productsDetails",
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "orders",
      localField: "orderModelId",
      foreignField: "_id",
      as: "orderDetails",
    },
  };
  let result = await listTwoJoinServiceForGlobal(
    req,
    orderProductsModel,
    searchArray,
    joinStage1,
    joinStage2
  );
  return res.status(200).json(result);
};

// for user
exports.getAllOrderForUser = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { orderId: searchRgx },
    {
      email: searchRgx,
    },
  ];
  let joinStage1 = {
    $lookup: {
      from: "products",
      localField: "products.productId",
      foreignField: "_id",
      as: "productsDetails",
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "orders",
      localField: "orderModelId",
      foreignField: "_id",
      as: "orderDetails",
    },
  };
  let result = await listTwoJoinService(
    req,
    orderProductsModel,
    searchArray,
    joinStage1,
    joinStage2
  );
  return res.status(200).json(result);
};

exports.getDetailsById = async (req, res) => {
  joinStage1 = {
    $lookup: {
      from: "products",
      localField: "products.productId",
      foreignField: "_id",
      as: "allProduct",
    },
  };
  joinStage2 = {
    $lookup: {
      from: "orders",
      localField: "orderModelId",
      foreignField: "_id",
      as: "orderDetails",
    },
  };
  let result = await getDetailsByIdTwoJoinService(
    req,
    orderProductsModel,
    joinStage1,
    joinStage2
  );

  return res.status(200).json(result);
};

exports.changeOrderStatus = async (req, res) => {
  let result = await updateService(req, orderModel);
  return res.status(200).json(result);
};
