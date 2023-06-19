// index.js

const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const sdk = require('api')('@leonardoai/v1.0#28807z41owlgnis8jg');

// Authenticate the SDK
sdk.auth(process.env['SDK_AUTH_TOKEN']);

// Supabase connection
const supabaseUrl = process.env['SUPABASE_URL'];
const supabaseKey = process.env['SUPABASE_ANON_KEY'];
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('.'));

// Import the handlers from leo.js and imageGeneration.js
const leo = require('./leo')(sdk, supabase);
const imageGeneration = require('./imageGeneration')(sdk, supabase);

// Use the functions as the handlers for your endpoints
app.get('/api/get-user-info', leo.getUserInfo);
app.post('/api/generate-image', imageGeneration.generateImage);

app.get('/api/test-supabase', leo.testSupabase);

// This is the new route that displays a link to the test route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
