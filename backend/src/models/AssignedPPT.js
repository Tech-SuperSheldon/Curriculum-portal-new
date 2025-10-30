const mongoose = require('mongoose');

const assignedPPTSchema = new mongoose.Schema({
  title: String,
  description: String,
  subject: String,
  grade: String,
  fileUrl: String, 
  uploadedBy: String,
  assignedTo: String, 
});

const AssignedPPT = mongoose.model('assinedPPT', assignedPPTSchema);
module.exports = AssignedPPT ;