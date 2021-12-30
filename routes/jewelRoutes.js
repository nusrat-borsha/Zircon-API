const express = require('express');
const jewelController = require('../controllers/jewelController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/') 
  .get(jewelController.getAllJewels)
  .post(jewelController.createJewels);

router
  .route('/:id')
  .get(jewelController.getJewel)
  .patch(jewelController.updateJewel)
  .delete(jewelController.deleteJewel);

module.exports = router;
