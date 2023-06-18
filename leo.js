// leo.js

const sdk = require('api')('@leonardoai/v1.0#28807z41owlgnis8jg');
const { createClient } = require('@supabase/supabase-js')

// Supabase connection
const supabaseUrl = process.env['SUPABASE_URL'];
const supabaseKey = process.env['SUPABASE_ANON_KEY'];
const supabase = createClient(supabaseUrl, supabaseKey);

sdk.auth(process.env['SDK_AUTH_TOKEN']);

async function getUserInfo(req, res) {
  try {
    const { data } = await sdk.getUserSelf();
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function testSupabase(req, res) {
  const { data, error } = await supabase.from('Users').select('id')

  if (error) {
    res.status(500).json({ success: false, message: "Failed to connect to Supabase", error: error.message });
  } else {
    res.json({ success: true, message: "Connected to Supabase successfully", data: data });
  }
}

module.exports = { getUserInfo, testSupabase };
