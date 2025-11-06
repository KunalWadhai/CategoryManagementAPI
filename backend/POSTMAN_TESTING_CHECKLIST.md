# Postman Testing Checklist

Quick reference checklist for testing all API endpoints.

## ✅ Pre-Testing Setup

- [ ] MongoDB is running
- [ ] Server is started (`npm run dev`)
- [ ] Postman collection imported
- [ ] Health check endpoint works
- [ ] `base_url` variable set to `http://localhost:3000`

## 📋 Testing Checklist

### Health Check
- [ ] Health Check - Returns 200 OK

### Categories
- [ ] Create Category - Returns 201, saves categoryId
- [ ] Get All Categories - Returns 200, shows all categories
- [ ] Get Category by ID - Returns 200, shows category details
- [ ] Get Category by Name - Returns 200, shows category details
- [ ] Update Category - Returns 200, updates successfully
- [ ] Delete Category - Returns 200, deletes successfully

### Sub-Categories
- [ ] Create Sub-Category - Returns 201, saves subCategoryId
- [ ] Create Sub-Category (With Defaults) - Returns 201, inherits tax
- [ ] Get All Sub-Categories - Returns 200, shows all sub-categories
- [ ] Get Sub-Categories by Category - Returns 200, shows filtered results
- [ ] Get Sub-Category by ID - Returns 200, shows sub-category details
- [ ] Get Sub-Category by Name - Returns 200, shows sub-category details
- [ ] Update Sub-Category - Returns 200, updates successfully
- [ ] Delete Sub-Category - Returns 200, deletes successfully

### Items
- [ ] Create Item (Under Sub-Category) - Returns 201, saves itemId
- [ ] Create Item (Under Category) - Returns 201, creates successfully
- [ ] Get All Items - Returns 200, shows all items
- [ ] Get Items by Category - Returns 200, shows filtered results
- [ ] Get Items by Sub-Category - Returns 200, shows filtered results
- [ ] Get Item by ID - Returns 200, shows item details
- [ ] Get Item by Name - Returns 200, shows item details
- [ ] Search Items by Name - Returns 200, shows matching items
- [ ] Update Item - Returns 200, updates and recalculates totalAmount
- [ ] Delete Item - Returns 200, deletes successfully

## 🧪 Error Testing

### Validation Errors
- [ ] Create Category without required fields - Returns 400
- [ ] Create Sub-Category without categoryId - Returns 400
- [ ] Create Item without required fields - Returns 400
- [ ] Create Item without categoryId or subCategoryId - Returns 400

### Not Found Errors
- [ ] Get Category with invalid ID - Returns 404
- [ ] Get Sub-Category with invalid ID - Returns 404
- [ ] Get Item with invalid ID - Returns 404
- [ ] Update non-existent resource - Returns 404

### Conflict Errors
- [ ] Create duplicate category name - Returns 409
- [ ] Create duplicate sub-category name - Returns 409
- [ ] Create duplicate item name - Returns 409

## 🔍 Feature Testing

### Tax Inheritance
- [ ] Create category with tax: 10
- [ ] Create sub-category without tax (should inherit)
- [ ] Verify sub-category has tax: 10

### Auto-calculation
- [ ] Create item with baseAmount: 1000, discount: 100
- [ ] Verify totalAmount: 900 (auto-calculated)
- [ ] Update item baseAmount: 1200
- [ ] Verify totalAmount recalculated: 1100

### Search Functionality
- [ ] Create items with "iPhone" in name
- [ ] Search for "iPhone" - Returns matching items
- [ ] Search for "iphone" (lowercase) - Returns matching items (case-insensitive)
- [ ] Search for "Samsung" - Returns empty array if no matches

### Relationships
- [ ] Create category → Create sub-category → Verify relationship
- [ ] Create item under sub-category → Verify both category and subCategory populated
- [ ] Get items by category → Returns items directly under category and under sub-categories
- [ ] Get items by sub-category → Returns only items under that sub-category

## 📊 Response Validation

### Success Response Structure
- [ ] All success responses have `success: true`
- [ ] All success responses have `data` field
- [ ] Created resources have `_id` field
- [ ] Timestamps are present (`createdAt`, `updatedAt`)

### Error Response Structure
- [ ] All error responses have `success: false`
- [ ] All error responses have `message` field
- [ ] Validation errors show specific field errors

## 🎯 Advanced Testing

### Bulk Operations
- [ ] Create multiple categories
- [ ] Create multiple sub-categories under one category
- [ ] Create multiple items under one sub-category
- [ ] Verify all relationships maintained

### Update Scenarios
- [ ] Update category name (verify uniqueness)
- [ ] Update item price (verify totalAmount recalculation)
- [ ] Update tax settings (verify inheritance doesn't break)

### Delete Scenarios
- [ ] Delete category with sub-categories (test cascade behavior)
- [ ] Delete sub-category with items (test cascade behavior)
- [ ] Delete item (should work independently)

## 📝 Notes

- Variables are auto-populated when creating resources
- Always check response status codes
- Verify data integrity after updates
- Test edge cases (empty strings, null values, etc.)

## 🐛 Common Issues

- **Variables not saving:** Check test scripts are running
- **Connection refused:** Verify server is running
- **404 errors:** Check base_url and endpoint paths
- **Validation errors:** Review request body format

---

**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

