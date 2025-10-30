const express = require('express');
const pptRouter = express.Router();
const { pptAssigned , getAssignedPPT } = require('../controllers/AssignPPT/pptController');

pptRouter.post('/assignPPT', pptAssigned);
pptRouter.get('/getPPT' , getAssignedPPT);

module.exports = pptRouter;