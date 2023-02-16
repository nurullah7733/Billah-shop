const listTwoJoinServiceForProductsGlobal = async (
  Request,
  DataModel,
  searchArray,
  joinStage1,
  joinStage2
) => {
  // query search
  let min = Number(Request.query.min);
  let max = Number(Request.query.max);
  let category = Request.query.category;
  let brand = Request.query.brand;

  let pageNo = Number(Request.params.pageNo);
  let perPage = Number(Request.params.perPage);
  let searchKeyword = Request.params.searchKeyword;
  let skipRow = (pageNo - 1) * perPage;

  let searchQueryCategory = [
    { "category.name": { $regex: Request.query.category, $options: "i" } },
  ];
  let searchQueryBrand = [
    { "brand.name": { $regex: Request.query.brand, $options: "i" } },
  ];

  try {
    let data;

    // only search
    if (
      isNaN(min) &&
      isNaN(max) &&
      category === undefined &&
      brand === undefined &&
      searchKeyword !== "0"
    ) {
      console.log("1");
      data = await DataModel.aggregate([
        joinStage1,
        joinStage2,
        { $match: { $or: searchArray } },
        {
          $facet: {
            total: [{ $count: "count" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
      // all
    }
    if (
      isNaN(min) &&
      isNaN(max) &&
      category === undefined &&
      brand === undefined &&
      searchKeyword === "0"
    ) {
      console.log("2");
      data = await DataModel.aggregate([
        joinStage1,
        joinStage2,
        { $match: { $expr: { $ne: ["$events", []] } } },
        {
          $facet: {
            total: [{ $count: "count" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    }

    // only min and max
    if (
      !isNaN(min) &&
      !isNaN(max) &&
      category === undefined &&
      brand === undefined &&
      searchKeyword === "0"
    ) {
      console.log("3");
      data = await DataModel.aggregate([
        joinStage1,
        joinStage2,
        { $match: { price: { $gte: min, $lte: max } } },
        {
          $facet: {
            total: [{ $count: "count" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    }
    // only min and max and search
    if (
      !isNaN(min) &&
      !isNaN(max) &&
      category === undefined &&
      brand === undefined &&
      searchKeyword !== "0"
    ) {
      console.log("4");
      data = await DataModel.aggregate([
        joinStage1,
        joinStage2,
        { $match: { price: { $gte: min, $lte: max } } },
        { $match: { $or: searchArray } },
        {
          $facet: {
            total: [{ $count: "count" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    }
    // only min, max, and category
    if (
      !isNaN(min) &&
      !isNaN(max) &&
      category !== undefined &&
      searchKeyword === "0"
    ) {
      console.log("4");
      data = await DataModel.aggregate([
        joinStage1,
        joinStage2,
        { $match: { price: { $gte: min, $lte: max } } },
        { $match: { $or: searchQueryCategory } },
        {
          $facet: {
            total: [{ $count: "count" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    }
    // only min, max, category and search
    if (
      !isNaN(min) &&
      !isNaN(max) &&
      category !== undefined &&
      searchKeyword !== "0"
    ) {
      console.log("4");
      data = await DataModel.aggregate([
        joinStage1,
        joinStage2,
        { $match: { price: { $gte: min, $lte: max } } },
        { $match: { $or: searchQueryCategory } },
        { $match: { $or: searchArray } },
        {
          $facet: {
            total: [{ $count: "count" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    }

    // only min, max, and brand
    if (
      !isNaN(min) &&
      !isNaN(max) &&
      brand !== undefined &&
      searchKeyword === "0"
    ) {
      console.log("4");
      data = await DataModel.aggregate([
        joinStage1,
        joinStage2,
        { $match: { price: { $gte: min, $lte: max } } },
        { $match: { $or: searchQueryBrand } },
        {
          $facet: {
            total: [{ $count: "count" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    }
    // only min, max, brand and search
    if (
      !isNaN(min) &&
      !isNaN(max) &&
      brand !== undefined &&
      searchKeyword !== "0"
    ) {
      console.log("4");
      data = await DataModel.aggregate([
        joinStage1,
        joinStage2,
        { $match: { price: { $gte: min, $lte: max } } },
        { $match: { $or: searchQueryBrand } },
        { $match: { $or: searchArray } },
        {
          $facet: {
            total: [{ $count: "count" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    }

    // only category
    if (
      isNaN(min) &&
      isNaN(max) &&
      category !== undefined &&
      searchKeyword === "0"
    ) {
      console.log("4");
      data = await DataModel.aggregate([
        joinStage1,
        joinStage2,
        { $match: { $or: searchQueryCategory } },
        {
          $facet: {
            total: [{ $count: "count" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    }
    // only category and search
    if (
      isNaN(min) &&
      isNaN(max) &&
      category !== undefined &&
      searchKeyword !== "0"
    ) {
      console.log("4");
      data = await DataModel.aggregate([
        joinStage1,
        joinStage2,
        { $match: { $or: searchQueryCategory } },
        { $match: { $or: searchArray } },
        {
          $facet: {
            total: [{ $count: "count" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    }

    // only brand
    if (
      isNaN(min) &&
      isNaN(max) &&
      brand !== undefined &&
      searchKeyword === "0"
    ) {
      console.log("11");
      data = await DataModel.aggregate([
        joinStage1,
        joinStage2,
        { $match: { $or: searchQueryBrand } },
        {
          $facet: {
            total: [{ $count: "count" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    }
    // only category and search
    if (
      isNaN(min) &&
      isNaN(max) &&
      brand !== undefined &&
      searchKeyword !== "0"
    ) {
      console.log("12");
      data = await DataModel.aggregate([
        joinStage1,
        joinStage2,
        { $match: { $or: searchQueryBrand } },
        { $match: { $or: searchArray } },
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

module.exports = listTwoJoinServiceForProductsGlobal;
