const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching products');
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = new Product({ name, price, description });
    await product.save();
    res.redirect('/add-product');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding product');
  }
};


exports.updateProduct = async (req, res) => {
    try {
      const { id } = req.params;  // Extract the id from the URL
      const { name, price, description } = req.body;
  
      // Ensure the id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid product ID');
      }
  
      const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, description }, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).send('Product not found');
      }
  
      res.redirect('/add-product');
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).send('Error updating product');
    }
  };
// Update a product by ID
// exports.updateProduct = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { name, price, description } = req.body;
  
//       const updatedProduct = await Product.findByIdAndUpdate(
//         id, 
//         { name, price, description }, 
//         { new: true, runValidators: true } // Options to return the updated document and run validation
//       );
  
//       if (!updatedProduct) {
//         return res.status(404).send('Product not found');
//       }
  
//       res.redirect('/add-product');
//     } catch (error) {
//       console.error('Error updating product:', error.message);
//       res.status(500).send('Error updating product');
//     }
//   };
// exports.updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, price, description } = req.body;
//     await Product.findByIdAndUpdate(id, { name, price, description });
//     res.redirect('/add-product');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error updating product');
//   }
// };

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/add-product');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting product');
  }
};
