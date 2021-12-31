const express = require('express');
const jewelController = require('../controllers/jewelController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/') 
  .get(jewelController.getAllJewels)
  .post(authController.protect, jewelController.createJewels);

router
  .route('/:id')
  .get(jewelController.getJewel)
  .patch(authController.protect, jewelController.updateJewel)
  .delete(authController.protect, jewelController.deleteJewel);

module.exports = router;
