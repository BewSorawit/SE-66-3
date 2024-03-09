// index.js
const app = require('./config/express');
const db = require('./config/db');

// Define the port for the server to listen on
const port = process.env.PORT || 3001;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
