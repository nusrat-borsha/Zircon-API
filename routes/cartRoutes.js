const express = require('express');
const jewelController = require('../controllers/jewelController');
const authController = require('../controllers/authController');

const router = express.Router();

//authController.restrictTo('admin') <-- only admins can access
router.get('/checkout-session/:jewelID', cartController.getCheckoutSession);

router
  .route('/:id')
  .get(jewelController.getJewel)
  .patch(authController.protect, authController.restrictTo('admin'), jewelController.updateJewel)
  .delete(authController.protect, authController.restrictTo('admin'), jewelController.deleteJewel);

module.exports = router;
