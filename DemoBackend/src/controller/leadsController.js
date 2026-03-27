const Lead = require("../models/Lead");

// GET all leads (only current user)
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ createdBy: req.user.id }).populate("createdBy", "name email");
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE lead (automatically owned by current user)
exports.createLead = async (req, res) => {
  try {
    const { name, status } = req.body;
    const lead = await Lead.create({ name, status, createdBy: req.user.id });
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE lead (only if current user owns it)
exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    lead.name = req.body.name || lead.name;
    lead.status = req.body.status || lead.status;
    await lead.save();

    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE lead (only if current user owns it)
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    //  Use deleteOne instead of remove
    await Lead.deleteOne({ _id: lead._id });

    res.json({ message: "Lead deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};