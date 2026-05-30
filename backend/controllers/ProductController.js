import Product from "../models/Product.js";


// Create Product
export const createProduct = async (req, res) => {
  try {

    const { name, description, price, category, stock, image } = req.body;

    // Validation
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Create Product
    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error creating product",
    });
  }
};



// Get All Products
export const getProducts = async (req, res) => {
  try {
    const { search,category } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    } 
    if (category) {
      query.category = category;
    }

    const products = await Product.find(query);

    res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
};



// Get Single Product
export const getSingleProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error fetching product",
    });
  }
};



// Update Product
export const updateProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error updating product",
    });
  }
};



// Delete Product
export const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error deleting product",
    });
  }
};

export const createManyProducts = async (req, res) => {
  try {

    const products = await Product.insertMany(req.body);

    res.status(201).json({
      success: true,
      message: "Products added successfully",
      products,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error adding products",
    });

  }
};