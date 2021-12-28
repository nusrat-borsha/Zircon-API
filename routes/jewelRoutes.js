const express = require('express');
const jewelController = require('../controllers/jewelController');

const router = express.Router();

router
  .route('/api/v1/collections') 
  .get(jewelController.getAllJewels)
  .post(jewelController.createJewels);

router
  .route('/api/v1/collections/:id')
  .get(jewelController.getJewel)
  .patch(jewelController.updateJewel)
  .delete(jewelController.deleteJewel);

module.exports = router;
