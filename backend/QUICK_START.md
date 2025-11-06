# Quick Start Guide

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

## Setup Steps

1. **Navigate to the backend directory:**
   ```bash
   cd CategoryManagementAPI/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Update `.env` file with your MongoDB connection:**
   ```
   MONGODB_URI=mongodb://localhost:27017/categorymanagement
   PORT=3000
   ```

5. **Start MongoDB** (if running locally):
   ```bash
   # On Linux/Mac
   sudo systemctl start mongod
   # or
   mongod
   
   # On Windows
   net start MongoDB
   ```

6. **Start the server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

7. **Verify the server is running:**
   - Open browser: http://localhost:3000/health
   - You should see: `{"status":"OK","timestamp":"...","uptime":...}`

## Testing the API

### Using cURL

**Create a Category:**
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

**Get All Categories:**
```bash
curl http://localhost:3000/api/categories
```

### Using Postman or Thunder Client

1. Import the API endpoints from `API_EXAMPLES.md`
2. Start making requests to test the API

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── categoryController.js
│   │   ├── subCategoryController.js
│   │   └── itemController.js
│   ├── models/
│   │   ├── Category.js
│   │   ├── SubCategory.js
│   │   └── Item.js
│   ├── routes/
│   │   ├── categoryRoutes.js
│   │   ├── subCategoryRoutes.js
│   │   └── itemRoutes.js
│   ├── middleware/
│   │   └── errorHandler.js
│   └── server.js                # Main server file
├── package.json
├── .env.example
└── README.md
```

## API Base URL

- Local: `http://localhost:3000`
- API endpoints: `http://localhost:3000/api`

## Common Issues

### MongoDB Connection Error
- Make sure MongoDB is running
- Check the `MONGODB_URI` in `.env` file
- Verify MongoDB is accessible on the specified port (default: 27017)

### Port Already in Use
- Change the `PORT` in `.env` file
- Or stop the process using port 3000

### Module Not Found
- Run `npm install` again
- Make sure you're in the `backend` directory

## Next Steps

1. Read the full documentation in `README.md`
2. Check `API_EXAMPLES.md` for detailed API usage examples
3. Start building your frontend or testing the APIs

## Support

For issues or questions, refer to:
- `README.md` - Full API documentation
- `API_EXAMPLES.md` - API usage examples

