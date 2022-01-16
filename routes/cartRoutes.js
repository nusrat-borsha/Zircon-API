const express = require('express');
const jewelController = require('../controllers/jewelController');
const authController = require('../controllers/authController');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.route('/:productId')
      .post(authController.protect, cartController.addToCart)
      .patch(authController.protect, cartController.deleteItemCart);
//router.get('/checkout-session/:jewelID', cartController.getCheckoutSession);

router
  .route('/')
  .get(jewelController.getJewel)
  .patch(authController.protect, authController.restrictTo('admin'), jewelController.updateJewel)
  .delete(authController.protect, authController.restrictTo('admin'), jewelController.deleteJewel);

module.exports = router;
