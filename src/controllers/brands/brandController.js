const BrandModel = require("../../models/brand/brandModel");
const createService = require("../../services/common/createService");
const deleteService = require("../../services/common/deleteService");
const dropdownListService = require("../../services/common/dropdownListService");
const getServiceById = require("../../services/common/getSerciceById");
const listService = require("../../services/common/listService");
const updateService = require("../../services/common/updateService");

exports.createBrand = async (req, res) => {
  let result = await createService(req, BrandModel);
  return res.status(200).json(result);
};

exports.listBrand = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [{ name: searchRgx }];
  let result = await listService(req, BrandModel, searchArray);
  return res.status(200).json(result);
};
exports.dropdownListBrand = async (req, res) => {
  let result = await dropdownListService(req, BrandModel);
  return res.status(200).json(result);
};
exports.getBrandDetailsById = async (req, res) => {
  let result = await getServiceById(req, BrandModel);
  return res.status(200).json(result);
};
exports.updateBrand = async (req, res) => {
  let result = await updateService(req, BrandModel);
  return res.status(200).json(result);
};
exports.deleteBrand = async (req, res) => {
  let result = await deleteService(req, BrandModel);
  return res.status(200).json(result);
};
