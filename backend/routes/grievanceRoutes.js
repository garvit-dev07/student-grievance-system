const express = require("express");
const {
  createGrievance,
  getGrievances,
  getGrievanceById,
  updateGrievance,
  deleteGrievance,
  searchGrievances
} = require("../controllers/grievanceController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.post("/", createGrievance);
router.get("/", getGrievances);
router.get("/search", searchGrievances);
router.get("/:id", getGrievanceById);
router.put("/:id", updateGrievance);
router.delete("/:id", deleteGrievance);

module.exports = router;
