import express from 'express';
import {
  createItem,
  getAllItems,
  getItemsByCategory,
  getItemsBySubCategory,
  getItemByIdOrName,
  searchItemsByName,
  updateItem,
  deleteItem
} from '../controllers/itemController.js';

const router = express.Router();

// Search Items by Name (must be before /:identifier route)
router.get('/search', searchItemsByName);

// Get All Items
router.get('/', getAllItems);

// Get All Items under a Category
router.get('/category/:categoryId', getItemsByCategory);

// Get All Items under a Sub-Category
router.get('/subcategory/:subCategoryId', getItemsBySubCategory);

// Get Item by ID or Name
router.get('/:identifier', getItemByIdOrName);

// Create Item
router.post('/', createItem);

// Update Item
router.put('/:id', updateItem);

// Delete Item
router.delete('/:id', deleteItem);

export default router;

