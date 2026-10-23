import Product from '../models/product.js';

// Saare products fetch karna
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Single product fetch karna ID ke through
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Invalid Product ID or Server Error", error: error.message });
  }
};

// Naya product database mein add karna (Sirf Admin ke liye)
export const createProduct = async (req, res) => {
  try {
    const { title, price, description, category, stock, image } = req.body;
    
    const product = new Product({
      title,
      price,
      description,
      category,
      stock,
      image: image || 'https://via.placeholder.com/300'
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};

// Admin: Product ko delete karna
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};