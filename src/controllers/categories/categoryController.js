const CategoryModel = require("../../models/category/categoryModel");
const createService = require("../../services/common/createService");
const listService = require("../../services/common/listService");
const dropdownListService = require("../../services/common/dropdownListService");
const getServiceById = require("../../services/common/getSerciceById");
const deleteService = require("../../services/common/deleteService");
const updateService = require("../../services/common/updateService");

exports.createCateogry = async (req, res) => {
  let result = await createService(req, CategoryModel);
  return res.status(200).json(result);
};
exports.listCategory = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [{ name: searchRgx }];
  let result = await listService(req, CategoryModel, searchArray);
  return res.status(200).json(result);
};
exports.dropdownListCategory = async (req, res) => {
  let result = await dropdownListService(req, CategoryModel);
  return res.status(200).json(result);
};
exports.getCategoryDetailsById = async (req, res) => {
  let result = await getServiceById(req, CategoryModel);
  return res.status(200).json(result);
};
exports.updateCategory = async (req, res) => {
  let result = await updateService(req, CategoryModel);
  return res.status(200).json(result);
};
exports.deleteCategory = async (req, res) => {
  let result = await deleteService(req, CategoryModel);
  return res.status(200).json(result);
};
