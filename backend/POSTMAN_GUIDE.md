# Postman Collection Guide - Category Management API

Complete guide to import and test all APIs using Postman.

## 📥 Importing the Collection

### Method 1: Import from File

1. **Open Postman**
   - Launch Postman application (Desktop or Web)

2. **Import Collection**
   - Click on **"Import"** button (top left)
   - Click **"Upload Files"** or drag and drop
   - Select `Postman_Collection.json` from the `backend` folder
   - Click **"Import"**

3. **Verify Import**
   - You should see "Category Management API" collection in the left sidebar
   - The collection should have 4 folders:
     - Health Check
     - Categories
     - Sub-Categories
     - Items

### Method 2: Import from URL (if hosted)

1. Click **"Import"** → **"Link"**
2. Paste the collection URL
3. Click **"Continue"** → **"Import"**

## ⚙️ Setting Up Environment Variables

The collection uses variables to make testing easier. These are automatically set when you create resources.

### Collection Variables

The collection includes these variables (auto-populated):

- `base_url` - API base URL (default: `http://localhost:3000`)
- `categoryId` - Auto-saved when creating a category
- `categoryName` - Auto-saved when creating a category
- `subCategoryId` - Auto-saved when creating a sub-category
- `subCategoryName` - Auto-saved when creating a sub-category
- `itemId` - Auto-saved when creating an item
- `itemName` - Auto-saved when creating an item

### Manual Setup (Optional)

1. Click on the collection name
2. Go to **"Variables"** tab
3. Update `base_url` if your server runs on a different port
4. Other variables will be auto-populated when you create resources

## 🚀 Testing Workflow

### Step 1: Start Your Server

```bash
cd CategoryManagementAPI/backend
npm install
npm run dev
```

Verify server is running:
- Open: http://localhost:3000/health
- Should return: `{"status":"OK",...}`

### Step 2: Test Health Check

1. Open **"Health Check"** → **"Health Check"**
2. Click **"Send"**
3. Expected: Status `200 OK` with server status

### Step 3: Create a Category

1. Open **"Categories"** → **"Create Category"**
2. Review the request body (pre-filled example)
3. Click **"Send"**
4. **Important:** The response will automatically save `categoryId` and `categoryName` to collection variables
5. Expected: Status `201 Created` with category data
6. **Copy the `_id` from response** (you'll need it for sub-categories)

### Step 4: Get All Categories

1. Open **"Categories"** → **"Get All Categories"**
2. Click **"Send"**
3. Expected: Status `200 OK` with array of categories

### Step 5: Get Category by ID

1. Open **"Categories"** → **"Get Category by ID"**
2. The `{{categoryId}}` variable should be auto-filled
3. Click **"Send"**
4. Expected: Status `200 OK` with category details

### Step 6: Create a Sub-Category

1. Open **"Sub-Categories"** → **"Create Sub-Category"**
2. The request body uses `{{categoryId}}` (auto-filled from Step 3)
3. Update the name/description if needed
4. Click **"Send"**
5. **Important:** The response will automatically save `subCategoryId` and `subCategoryName`
6. Expected: Status `201 Created` with sub-category data

### Step 7: Create Sub-Category with Defaults

1. Open **"Sub-Categories"** → **"Create Sub-Category (With Defaults)"**
2. Notice: No `taxApplicability` or `tax` fields
3. Click **"Send"**
4. Expected: Tax settings inherited from parent category

### Step 8: Get Sub-Categories by Category

1. Open **"Sub-Categories"** → **"Get Sub-Categories by Category"**
2. Click **"Send"**
3. Expected: Status `200 OK` with all sub-categories under the category

### Step 9: Create an Item

1. Open **"Items"** → **"Create Item (Under Sub-Category)"**
2. The request uses `{{subCategoryId}}` (auto-filled)
3. Update item details as needed
4. **Note:** `totalAmount` is auto-calculated (baseAmount - discount)
5. Click **"Send"**
6. **Important:** The response will automatically save `itemId` and `itemName`
7. Expected: Status `201 Created` with item data

### Step 10: Search Items

1. Open **"Items"** → **"Search Items by Name"**
2. Update the query parameter `name` (default: "iPhone")
3. Click **"Send"**
4. Expected: Status `200 OK` with matching items

### Step 11: Update Item

1. Open **"Items"** → **"Update Item"**
2. Update the request body (e.g., change `baseAmount` or `discount`)
3. Click **"Send"**
4. Expected: Status `200 OK` with updated item
5. **Note:** `totalAmount` is automatically recalculated

### Step 12: Test Other Endpoints

Continue testing:
- Get all items
- Get items by category
- Get items by sub-category
- Update category/sub-category
- Delete operations

## 📋 Complete Test Sequence

Here's the recommended order to test all endpoints:

### 1. Health Check
- ✅ Health Check

### 2. Categories
- ✅ Create Category
- ✅ Get All Categories
- ✅ Get Category by ID
- ✅ Get Category by Name
- ✅ Update Category
- ✅ Delete Category (optional, test last)

### 3. Sub-Categories
- ✅ Create Sub-Category
- ✅ Create Sub-Category (With Defaults)
- ✅ Get All Sub-Categories
- ✅ Get Sub-Categories by Category
- ✅ Get Sub-Category by ID
- ✅ Get Sub-Category by Name
- ✅ Update Sub-Category
- ✅ Delete Sub-Category (optional, test last)

### 4. Items
- ✅ Create Item (Under Sub-Category)
- ✅ Create Item (Under Category)
- ✅ Get All Items
- ✅ Get Items by Category
- ✅ Get Items by Sub-Category
- ✅ Get Item by ID
- ✅ Get Item by Name
- ✅ Search Items by Name
- ✅ Update Item
- ✅ Delete Item (optional, test last)

## 🔍 Understanding Responses

### Success Response Format

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response Format

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

### Common Status Codes

- `200` - Success (GET, PUT, DELETE)
- `201` - Created (POST)
- `400` - Bad Request (validation error)
- `404` - Not Found
- `409` - Conflict (duplicate entry)
- `500` - Internal Server Error

## 🎯 Tips for Testing

### 1. Use Collection Variables

The collection automatically saves IDs when you create resources. This makes testing easier:
- Create a category → `categoryId` is saved
- Create a sub-category → `subCategoryId` is saved
- Create an item → `itemId` is saved

### 2. Test Error Cases

Try these to test error handling:

**Duplicate Name:**
- Create a category with name "Electronics"
- Try to create another with the same name
- Expected: `409 Conflict`

**Invalid ID:**
- Use an invalid MongoDB ID format
- Expected: `400 Bad Request` or `404 Not Found`

**Missing Required Fields:**
- Remove required fields from request body
- Expected: `400 Bad Request`

**Non-existent Resource:**
- Use a non-existent ID
- Expected: `404 Not Found`

### 3. Test Tax Inheritance

1. Create a category with `taxApplicability: true, tax: 10`
2. Create a sub-category without tax fields
3. Verify sub-category inherits tax settings

### 4. Test Auto-calculation

1. Create an item with `baseAmount: 1000, discount: 100`
2. Verify `totalAmount` is `900` (auto-calculated)
3. Update item with new `baseAmount: 1200`
4. Verify `totalAmount` is recalculated

### 5. Test Search Functionality

1. Create multiple items with "iPhone" in the name
2. Search for "iPhone"
3. Verify all matching items are returned (case-insensitive)

## 🐛 Troubleshooting

### Variables Not Auto-Populating

**Problem:** Collection variables are empty after creating resources.

**Solution:**
1. Check that the test script ran successfully
2. Verify response status is `201` (for creation)
3. Manually copy IDs from response and update variables

### Connection Refused

**Problem:** `Error: connect ECONNREFUSED`

**Solution:**
1. Verify server is running: `npm run dev`
2. Check `base_url` variable matches server URL
3. Verify MongoDB is running

### 404 Not Found

**Problem:** Getting 404 for valid endpoints

**Solution:**
1. Check `base_url` variable
2. Verify endpoint path is correct
3. Check server logs for routing issues

### Validation Errors

**Problem:** Getting 400 Bad Request

**Solution:**
1. Check request body format (JSON)
2. Verify all required fields are present
3. Check data types match requirements
4. Review error message in response

## 📝 Customizing Requests

### Changing Base URL

1. Click collection name → **"Variables"** tab
2. Update `base_url` value
3. Click **"Save"**

### Modifying Request Bodies

1. Open any request
2. Go to **"Body"** tab
3. Edit JSON as needed
4. Click **"Send"**

### Adding New Requests

1. Right-click on a folder
2. Select **"Add Request"**
3. Configure method, URL, headers, body
4. Save to collection

## 🔐 Testing with Different Environments

### Local Development
```
base_url: http://localhost:3000
```

### Production
```
base_url: https://your-api-domain.com
```

### Staging
```
base_url: https://staging-api-domain.com
```

## 📚 Additional Resources

- **API Documentation:** See `README.md`
- **API Examples:** See `API_EXAMPLES.md`
- **Quick Start:** See `QUICK_START.md`

## ✅ Checklist

Before testing, ensure:

- [ ] MongoDB is running
- [ ] Server is running (`npm run dev`)
- [ ] Collection is imported
- [ ] `base_url` variable is set correctly
- [ ] Health check endpoint works

## 🎉 You're Ready!

Start with the Health Check endpoint and follow the workflow above. The collection is designed to make testing easy with auto-populated variables and pre-filled examples.

Happy Testing! 🚀

