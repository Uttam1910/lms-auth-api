// index.js

require('dotenv').config(); // Load environment variables from .env file

// Import the server logic from server.js
const app = require('./app');

// Start the server
const PORT = process.env.PORT || 3000;
const HOST = '127.0.0.1';
app.listen(PORT, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});


