// index.js

const express = require('express');
const path = require('path');
const leo = require('./leo'); // Require the leo.js file

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('.'));

// Use the function from leo.js as the handler for your endpoint
app.get('/api/get-user-info', leo.getUserInfo);

app.get('/api/test-supabase', leo.testSupabase);

// This is the new route that displays a link to the test route
app.get('/', (req, res) => {
  res.send('<a href="/api/test-supabase">Test Supabase Connection</a>');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
