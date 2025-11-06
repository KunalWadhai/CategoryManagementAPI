import Item from '../models/Item.js';
import Category from '../models/Category.js';
import SubCategory from '../models/SubCategory.js';

// Create Item
export const createItem = async (req, res) => {
  try {
    const { 
      name, 
      image, 
      description, 
      categoryId, 
      subCategoryId, 
      taxApplicability, 
      tax, 
      baseAmount, 
      discount 
    } = req.body;

    // Validate required fields
    if (!name || !image || !description || !baseAmount) {
      return res.status(400).json({
        success: false,
        message: 'Name, image, description, and baseAmount are required'
      });
    }

    // Item must belong to either category or subCategory
    if (!categoryId && !subCategoryId) {
      return res.status(400).json({
        success: false,
        message: 'Item must belong to either a category or a sub-category'
      });
    }

    // If subCategoryId is provided, validate it exists
    let finalCategoryId = categoryId;
    if (subCategoryId) {
      const subCategory = await SubCategory.findById(subCategoryId).populate('category');
      if (!subCategory) {
        return res.status(404).json({
          success: false,
          message: 'Sub-category not found'
        });
      }
      // If subCategory exists, use its category as the categoryId
      if (!categoryId) {
        finalCategoryId = subCategory.category._id.toString();
      }
    }

    // If categoryId is provided, validate it exists
    if (finalCategoryId) {
      const category = await Category.findById(finalCategoryId);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }
    }

    // Check if item already exists
    const existingItem = await Item.findOne({ name });
    if (existingItem) {
      return res.status(409).json({
        success: false,
        message: 'Item with this name already exists'
      });
    }

    // Calculate total amount
    const finalDiscount = discount || 0;
    const totalAmount = Math.max(0, baseAmount - finalDiscount);

    const item = new Item({
      name,
      image,
      description,
      category: finalCategoryId || null,
      subCategory: subCategoryId || null,
      taxApplicability: taxApplicability !== undefined ? taxApplicability : false,
      tax: taxApplicability ? (tax || 0) : 0,
      baseAmount,
      discount: finalDiscount,
      totalAmount
    });

    await item.save();

    // Populate references for response
    await item.populate('category');
    await item.populate('subCategory');

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating item',
      error: error.message
    });
  }
};

// Get All Items
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate('category')
      .populate('subCategory')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching items',
      error: error.message
    });
  }
};

// Get All Items under a Category
export const getItemsByCategory = async (req, res) => {
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

    const items = await Item.find({ category: categoryId })
      .populate('category')
      .populate('subCategory')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching items',
      error: error.message
    });
  }
};

// Get All Items under a Sub-Category
export const getItemsBySubCategory = async (req, res) => {
  try {
    const { subCategoryId } = req.params;

    // Check if sub-category exists
    const subCategory = await SubCategory.findById(subCategoryId);
    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: 'Sub-category not found'
      });
    }

    const items = await Item.find({ subCategory: subCategoryId })
      .populate('category')
      .populate('subCategory')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching items',
      error: error.message
    });
  }
};

// Get Item by ID or Name
export const getItemByIdOrName = async (req, res) => {
  try {
    const { identifier } = req.params;
    
    // Check if identifier is a valid MongoDB ObjectId
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);
    
    let item;
    if (isObjectId) {
      item = await Item.findById(identifier)
        .populate('category')
        .populate('subCategory');
    } else {
      item = await Item.findOne({ name: identifier })
        .populate('category')
        .populate('subCategory');
    }

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching item',
      error: error.message
    });
  }
};

// Search Items by Name
export const searchItemsByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Search query (name) is required'
      });
    }

    // Case-insensitive search
    const items = await Item.find({
      name: { $regex: name, $options: 'i' }
    })
      .populate('category')
      .populate('subCategory')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      query: name,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching items',
      error: error.message
    });
  }
};

// Update Item
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      image, 
      description, 
      taxApplicability, 
      tax, 
      baseAmount, 
      discount 
    } = req.body;

    // Check if item exists
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Check if name is being updated and if it already exists
    if (name && name !== item.name) {
      const existingItem = await Item.findOne({ name });
      if (existingItem) {
        return res.status(409).json({
          success: false,
          message: 'Item with this name already exists'
        });
      }
    }

    // Update fields
    if (name) item.name = name;
    if (image) item.image = image;
    if (description) item.description = description;
    if (taxApplicability !== undefined) {
      item.taxApplicability = taxApplicability;
      if (!taxApplicability) {
        item.tax = 0;
      }
    }
    if (tax !== undefined && item.taxApplicability) {
      item.tax = tax;
    }
    if (baseAmount !== undefined) item.baseAmount = baseAmount;
    if (discount !== undefined) item.discount = discount;

    // Recalculate total amount
    item.totalAmount = Math.max(0, item.baseAmount - item.discount);

    await item.save();

    // Populate references for response
    await item.populate('category');
    await item.populate('subCategory');

    res.status(200).json({
      success: true,
      message: 'Item updated successfully',
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating item',
      error: error.message
    });
  }
};

// Delete Item (optional)
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting item',
      error: error.message
    });
  }
};

