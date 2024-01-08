const express = require("express");

const {
  getAllDealer,
  newDealer,
  updateDealer,
  deleteDealer,
} = require("../controllers/dealerController.js");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router.route("/get-dealers").get(isAuthenticatedUser, getAllDealer);
router.route("/new-dealer").post(isAuthenticatedUser, newDealer);
router.route("/update-dealer").put(isAuthenticatedUser, updateDealer);
router.route("/delete-dealer/:id").delete(isAuthenticatedUser, deleteDealer);

module.exports = router;
