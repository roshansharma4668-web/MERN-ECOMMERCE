import Product from '../models/product.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


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

export const updateProduct = async (req, res) => {
  try {
    const { title, price, description, category, image, stock } = req.body;

    // Database mein product dhundhna
    const product = await Product.findById(req.params.id);

    if (product) {
      // Agar product mil gaya, toh naya data set karna
      product.title = title || product.title;
      product.price = price || product.price;
      product.description = description || product.description;
      product.category = category || product.category;
      product.image = image || product.image;
      product.stock = stock || product.stock;

      // Updated product ko database mein save karna
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating product' });
  }
};