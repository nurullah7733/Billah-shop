const ProductModel = require("../../models/product/productModel");
const createService = require("../../services/common/createService");
const deleteService = require("../../services/common/deleteService");
const dropdownListService = require("../../services/common/dropdownListService");
const getServiceById = require("../../services/common/getSerciceById");
const listTwoJoinService = require("../../services/common/listTwoJoinService");
const listTwoJoinServiceForProductsGlobal = require("../../services/common/listTwoJoinServiceForProductsGlobal");
const updateService = require("../../services/common/updateService");

exports.createProduct = async (req, res) => {
  let result = await createService(req, ProductModel);
  return res.status(200).json(result);
};
exports.listProduct = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { name: searchRgx },
    { slug: searchRgx },
    { color: searchRgx },
    { "category.name": searchRgx },
    { "brand.name": searchRgx },
  ];
  let joinStage1 = {
    $lookup: {
      from: "categories",
      localField: "categoryId",
      foreignField: "_id",
      as: "category",
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "brands",
      localField: "brandId",
      foreignField: "_id",
      as: "brand",
    },
  };
  let result = await listTwoJoinService(
    req,
    ProductModel,
    searchArray,
    joinStage1,
    joinStage2
  );
  return res.status(200).json(result);
};
exports.listProductForGlobal = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { name: searchRgx },
    { slug: searchRgx },
    { color: searchRgx },
    { "category.name": searchRgx },
    { "brand.name": searchRgx },
  ];

  let joinStage1 = {
    $lookup: {
      from: "categories",
      localField: "categoryId",
      foreignField: "_id",
      as: "category",
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "brands",
      localField: "brandId",
      foreignField: "_id",
      as: "brand",
    },
  };
  let result = await listTwoJoinServiceForProductsGlobal(
    req,
    ProductModel,
    searchArray,
    joinStage1,
    joinStage2
  );
  return res.status(200).json(result);
};
exports.dropdownListProduct = async (req, res) => {
  let result = await dropdownListService(req, ProductModel);
  return res.status(200).json(result);
};
exports.getProductDetailsById = async (req, res) => {
  let result = await getServiceById(req, ProductModel);
  return res.status(200).json(result);
};
exports.updateProduct = async (req, res) => {
  let result = await updateService(req, ProductModel);
  return res.status(200).json(result);
};
exports.deleteProduct = async (req, res) => {
  let result = await deleteService(req, ProductModel);
  return res.status(200).json(result);
};
