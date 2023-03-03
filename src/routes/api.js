const router = require("express").Router();
const {
  createBrand,
  listBrand,
  updateBrand,
  deleteBrand,
  dropdownListBrand,
  getBrandDetailsById,
} = require("../controllers/brands/brandController");
const {
  createCard,
  getCards,
  removeCardwhenOrder,
  deleteCard,
} = require("../controllers/card/cardController");
const {
  createCateogry,
  listCategory,
  dropdownListCategory,
  getCategoryDetailsById,
  deleteCategory,
  updateCategory,
} = require("../controllers/categories/categoryController");
const {
  createCoupon,
  getCoupon,
  getCouponDetailsById,
  updateCoupon,
  deleteCoupon,
  validateCouponCode,
} = require("../controllers/coupon/couponController");
const {
  createOrder,
  getAllOrder,
  getAllOrderForAdmin,
  getAllOrderForUser,
  getDetailsById,
  changeOrderStatus,
} = require("../controllers/order/orderController");
const {
  createProduct,
  listProduct,
  dropdownListProduct,
  getProductDetailsById,
  updateProduct,
  deleteProduct,
  listProductForGlobal,
  ratingsProduct,
} = require("../controllers/products/productController");
const {
  uploadImages,
  deleteImages,
} = require("../controllers/upload/uploadController");
const {
  registration,
  login,
  userDetailsById,
  userUpdate,
  allUser,
  verifyEmail,
  verifyOtp,
  resetPassword,
  adminLogin,
  saveUserAddress,
} = require("../controllers/user/userController");
const {
  createWishList,
  createAndRemoveWishList,
  getWishList,
} = require("../controllers/wishList/wishListController");
const {
  uploadPhoto,
  productImgResize,
} = require("../middlewares/uploadImgMiddleware");
const verifyAdminMiddleware = require("../middlewares/verifyAdminMiddleware");
const verifyAuthMiddleware = require("../middlewares/verifyAuthMiddleware");

// registration
router.post("/registration", registration);
// login
router.post("/login", login);
router.post("/admin-login", adminLogin);
// user details for user
router.get("/user-detail-by-user/:id", verifyAuthMiddleware, userDetailsById);
// user details for Admin
router.get(
  "/user-detail-by-admin/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  userDetailsById
);
// user Udpate for User
router.post("/user-udpate-by-user/:id", verifyAuthMiddleware, userUpdate);
// user Udpate for Admin
router.post(
  "/user-udpate-by-admin/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  userUpdate
);

// all user for admin
router.get(
  "/all-user/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  allUser
);

// save address
router.post("/save-address/:id", verifyAuthMiddleware, saveUserAddress);

//------------------------------ Reset password----------------------------------------------------------------------------
// step 01
router.get("/verify-email/:email", verifyEmail);
// step 02
router.get("/verify-otp/:email/:otp", verifyOtp);
// step 03
router.post("/reset-password", resetPassword);

//------------------------------ Category ----------------------------------------------------------------------------
// Create Category
router.post(
  "/create-category",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  createCateogry
);
// list Category
router.get(
  "/list-category/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  listCategory
);
// dropdown list Category
router.get(
  "/dropdown-category",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  dropdownListCategory
);
// get category details by id
router.get(
  "/category-details/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getCategoryDetailsById
);
// update category
router.post(
  "/update-category/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  updateCategory
);
// delete category
router.get(
  "/delete-category/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteCategory
);

//------------------------------ Brands ----------------------------------------------------------------------------
// create brand
router.post(
  "/create-brand",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  createBrand
);

// list Brand
router.get(
  "/list-brand/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  listBrand
);
// dropdown list brand
router.get(
  "/dropdown-brand",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  dropdownListBrand
);
// get brand details by id
router.get(
  "/brand-details/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getBrandDetailsById
);
// update brand
router.post(
  "/update-brand/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  updateBrand
);
// delete brand
router.get(
  "/delete-brand/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteBrand
);

//------------------------------ product ----------------------------------------------------------------------------
// create product
router.post(
  "/create-product",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  createProduct
);

// list product
router.get(
  "/list-product/:pageNo/:perPage/:searchKeyword/:category",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  listProduct
);
// list product for Global
router.get(
  "/list-product-global/:pageNo/:perPage/:searchKeyword",
  listProductForGlobal
);
// dropdown list product
router.get(
  "/dropdown-product",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  dropdownListProduct
);
// get product details by id
router.get(
  "/product-details/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getProductDetailsById
);
// update product
router.post(
  "/update-product/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  updateProduct
);
// delete product
router.get(
  "/delete-product/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteProduct
);
// ratings product
router.post("/ratings-product/:id", verifyAuthMiddleware, ratingsProduct);

// -------------------------- Wish List -------------------------------------------------
router.post("/wishlist", verifyAuthMiddleware, createAndRemoveWishList);
router.get(
  "/getWishList/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  getWishList
);

// -------------------------- Coupon code -------------------------------------------------
router.post(
  "/coupon",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  createCoupon
);
router.get(
  "/all-coupon/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getCoupon
);
router.get(
  "/coupon-details/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getCouponDetailsById
);
router.post(
  "/update-coupon",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  updateCoupon
);
router.get(
  "/delete-coupon/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteCoupon
);
router.post(
  "/validate-coupon-code",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  validateCouponCode
);

// ------------------------- Upload Img -------------------------------------------------------------
router.post("/upload-img", uploadPhoto.array("images", 10), uploadImages);
router.get("/delete-img/:id", deleteImages);

// ------------------------- Card -------------------------------------------------------------
router.post("/create-card", verifyAuthMiddleware, createCard);
router.get(
  "/get-cards/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  getCards
);
router.post(
  "/remove-card-when-order",
  verifyAuthMiddleware,
  removeCardwhenOrder
);
router.get("/delete-card/:id", verifyAuthMiddleware, deleteCard);

// ------------------------- Order -------------------------------------------------------------
router.post("/create-order", verifyAuthMiddleware, createOrder);
// get all order for admin only
router.get(
  "/get-all-order-for-admin/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getAllOrderForAdmin
);
// get all order for user only
router.get(
  "/get-all-order/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  getAllOrderForUser
);

// get order details for admin only
router.get(
  "/get-order-details-for-admin/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getDetailsById
);

// get order details for user only
router.get("/get-order-details/:id", verifyAuthMiddleware, getDetailsById);
// change orderStatus for Admin
router.post(
  "/change-order-status/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  changeOrderStatus
);

module.exports = router;
