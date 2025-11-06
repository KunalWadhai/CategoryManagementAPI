import SubCategory from '../models/SubCategory.js';
import Category from '../models/Category.js';

// Create Sub-Category
export const createSubCategory = async (req, res) => {
  try {
    const { name, image, description, categoryId, taxApplicability, tax } = req.body;

    // Validate required fields
    if (!name || !image || !description || !categoryId) {
      return res.status(400).json({
        success: false,
        message: 'Name, image, description, and categoryId are required'
      });
    }

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Check if sub-category already exists
    const existingSubCategory = await SubCategory.findOne({ name });
    if (existingSubCategory) {
      return res.status(409).json({
        success: false,
        message: 'Sub-category with this name already exists'
      });
    }

    // Use category defaults if not provided
    const finalTaxApplicability = taxApplicability !== undefined 
      ? taxApplicability 
      : category.taxApplicability;
    const finalTax = tax !== undefined 
      ? tax 
      : (finalTaxApplicability ? category.tax : 0);

    const subCategory = new SubCategory({
      name,
      image,
      description,
      category: categoryId,
      taxApplicability: finalTaxApplicability,
      tax: finalTax
    });

    await subCategory.save();

    // Populate category for response
    await subCategory.populate('category');

    res.status(201).json({
      success: true,
      message: 'Sub-category created successfully',
      data: subCategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating sub-category',
      error: error.message
    });
  }
};

// Get All Sub-Categories
export const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find()
      .populate('category')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: subCategories.length,
      data: subCategories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching sub-categories',
      error: error.message
    });
  }
};

// Get All Sub-Categories under a Category
export const getSubCategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    const subCategories = await SubCategory.find({ category: categoryId })
      .populate('category')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: subCategories.length,
      data: subCategories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching sub-categories',
      error: error.message
    });
  }
};

// Get Sub-Category by ID or Name
export const getSubCategoryByIdOrName = async (req, res) => {
  try {
    const { identifier } = req.params;
    
    // Check if identifier is a valid MongoDB ObjectId
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);
    
    let subCategory;
    if (isObjectId) {
      subCategory = await SubCategory.findById(identifier).populate('category');
    } else {
      subCategory = await SubCategory.findOne({ name: identifier }).populate('category');
    }

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: 'Sub-category not found'
      });
    }

    res.status(200).json({
      success: true,
      data: subCategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching sub-category',
      error: error.message
    });
  }
};

// Update Sub-Category
export const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, description, taxApplicability, tax } = req.body;

    // Check if sub-category exists
    const subCategory = await SubCategory.findById(id).populate('category');
    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: 'Sub-category not found'
      });
    }

    // Check if name is being updated and if it already exists
    if (name && name !== subCategory.name) {
      const existingSubCategory = await SubCategory.findOne({ name });
      if (existingSubCategory) {
        return res.status(409).json({
          success: false,
          message: 'Sub-category with this name already exists'
        });
      }
    }

    // Update fields
    if (name) subCategory.name = name;
    if (image) subCategory.image = image;
    if (description) subCategory.description = description;
    if (taxApplicability !== undefined) {
      subCategory.taxApplicability = taxApplicability;
      if (!taxApplicability) {
        subCategory.tax = 0;
      }
    }
    if (tax !== undefined && subCategory.taxApplicability) {
      subCategory.tax = tax;
    }

    await subCategory.save();

    res.status(200).json({
      success: true,
      message: 'Sub-category updated successfully',
      data: subCategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating sub-category',
      error: error.message
    });
  }
};

// Delete Sub-Category (optional)
export const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subCategory = await SubCategory.findByIdAndDelete(id);
    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: 'Sub-category not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Sub-category deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting sub-category',
      error: error.message
    });
  }
};

