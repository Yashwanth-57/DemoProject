const express = require("express");
const router = express.Router();
const { getLeads , createLead, updateLead, deleteLead } = require("../controller/leadsController");
const protect = require("../middlewares/authmiddleware");

// All routes protected
router.use(protect);

router.get("/", getLeads);
router.post("/", createLead);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

module.exports = router;