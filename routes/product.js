const express = require('express');
const {
  getProducts, addProduct, updateProduct, deleteProduct,
} = require('../controllers/productController');
const { requireAuth } = require('../controllers/authController');
const router = express.Router();

router.get('/products', getProducts);
router.get('/add-product', requireAuth, (req, res) => res.render('addProduct'));
router.post('/add-product', requireAuth, addProduct);
//router.post('/update-product/:id', productController.updateProduct);
router.post('/update-product/:id', requireAuth, updateProduct);
router.post('/delete-product/:id', requireAuth, deleteProduct);

module.exports = router;
