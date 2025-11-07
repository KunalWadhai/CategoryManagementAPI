# API Endpoints Quick Reference

Complete list of all API endpoints with methods, URLs, and descriptions.

## Base URL
```
http://localhost:3000
```

## Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Check server health and status |

## Categories

| Method | Endpoint | Description | Body Required |
|--------|----------|-------------|---------------|
| POST | `/api/categories` | Create a new category | ✅ Yes |
| GET | `/api/categories` | Get all categories | ❌ No |
| GET | `/api/categories/:identifier` | Get category by ID or name | ❌ No |
| PUT | `/api/categories/:id` | Update category | ✅ Yes (optional fields) |
| DELETE | `/api/categories/:id` | Delete category | ❌ No |

### Create Category Request Body
```json
{
  "name": "Electronics",
  "image": "https://example.com/electronics.jpg",
  "description": "Electronic items",
  "taxApplicability": true,
  "tax": 10
}
```

## Sub-Categories

| Method | Endpoint | Description | Body Required |
|--------|----------|-------------|---------------|
| POST | `/api/subcategories` | Create a new sub-category | ✅ Yes |
| GET | `/api/subcategories` | Get all sub-categories | ❌ No |
| GET | `/api/subcategories/category/:categoryId` | Get sub-categories by category | ❌ No |
| GET | `/api/subcategories/:identifier` | Get sub-category by ID or name | ❌ No |
| PUT | `/api/subcategories/:id` | Update sub-category | ✅ Yes (optional fields) |
| DELETE | `/api/subcategories/:id` | Delete sub-category | ❌ No |

### Create Sub-Category Request Body
```json
{
  "name": "Smartphones",
  "image": "https://example.com/smartphones.jpg",
  "description": "Smartphone devices",
  "categoryId": "507f1f77bcf86cd799439011",
  "taxApplicability": true,  // Optional, defaults to category's value
  "tax": 10  // Optional, defaults to category's value
}
```

## Items

| Method | Endpoint | Description | Body Required |
|--------|----------|-------------|---------------|
| POST | `/api/items` | Create a new item | ✅ Yes |
| GET | `/api/items` | Get all items | ❌ No |
| GET | `/api/items/category/:categoryId` | Get items by category | ❌ No |
| GET | `/api/items/subcategory/:subCategoryId` | Get items by sub-category | ❌ No |
| GET | `/api/items/:identifier` | Get item by ID or name | ❌ No |
| GET | `/api/items/search?name=query` | Search items by name | ❌ No (query param) |
| PUT | `/api/items/:id` | Update item | ✅ Yes (optional fields) |
| DELETE | `/api/items/:id` | Delete item | ❌ No |

### Create Item Request Body
```json
{
  "name": "iPhone 15",
  "image": "https://example.com/iphone15.jpg",
  "description": "Latest iPhone model",
  "categoryId": "507f1f77bcf86cd799439011",  // Optional if subCategoryId provided
  "subCategoryId": "507f1f77bcf86cd799439012",  // Optional if categoryId provided
  "taxApplicability": true,
  "tax": 10,
  "baseAmount": 999,
  "discount": 50
}
```

**Note:** Item must belong to either a category OR sub-category. `totalAmount` is auto-calculated.

## Response Formats

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success (GET, PUT, DELETE) |
| 201 | Created (POST) |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 409 | Conflict (duplicate entry) |
| 500 | Internal Server Error |

## Testing Order

1. **Health Check** → Verify server is running
2. **Create Category** → Get categoryId
3. **Create Sub-Category** → Get subCategoryId
4. **Create Item** → Get itemId
5. **Test GET endpoints** → Verify data retrieval
6. **Test Search** → Verify search functionality
7. **Test UPDATE** → Verify updates work
8. **Test DELETE** → Verify deletion (optional)

## Quick cURL Examples

### Create Category
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Electronics",
    "image": "https://example.com/electronics.jpg",
    "description": "Electronic items",
    "taxApplicability": true,
    "tax": 10
  }'
```

### Get All Categories
```bash
curl http://localhost:3000/api/categories
```

### Search Items
```bash
curl "http://localhost:3000/api/items/search?name=iPhone"
```

### Update Item
```bash
curl -X PUT http://localhost:3000/api/items/{itemId} \
  -H "Content-Type: application/json" \
  -d '{
    "baseAmount": 1099,
    "discount": 100
  }'
```

## Notes

- All endpoints return JSON
- IDs can be MongoDB ObjectId or resource names
- Search is case-insensitive
- Tax inheritance: Sub-categories inherit from parent category if not specified
- Auto-calculation: Item totalAmount = baseAmount - discount
- Timestamps: All resources have `createdAt` and `updatedAt` fields


