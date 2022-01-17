const express = require('express');
const authController = require('../controllers/authController');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.route('/:productId')
      .post(authController.protect, cartController.addToCart)
      .patch(authController.protect, cartController.deleteItemCart);

router
  .route('/')
  .get(authController.protect, cartController.getCart)

module.exports = router;
