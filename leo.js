// leo.js

module.exports = (sdk, supabase) => {
  async function getUserInfo(req, res) {
    try {
      const { data } = await sdk.getUserSelf();
      console.log('Data from Leonardo API:', data);

      // Upsert the user details into the users table
      const { data: upsertData, error: upsertError } = await supabase
        .from('users')
        .upsert([
          {
            leo_id: data.user_details[0].user.id,
            leo_username: data.user_details[0].user.username,
            leo_tokenRenewalDate: data.user_details[0].tokenRenewalDate,
            leo_subscriptionTokens: data.user_details[0].subscriptionTokens,
            leo_subscriptionGptTokens: data.user_details[0].subscriptionGptTokens,
            leo_subscriptionModelTokens: data.user_details[0].subscriptionModelTokens,
            leo_apiCredit: data.user_details[0].apiCredit
          },
        ], { returning: 'minimal' }) // Do not return the inserted or updated row

      if (upsertError) {
        console.log('Error upserting data: ', upsertError)
      } else {
        console.log('Data upserted successfully')
      }

      res.json(data);
    } catch (err) {
      console.error('Error in getUserInfo:', err);
      res.status(500).send(err.message);
    }
  }

  async function testSupabase(req, res) {
    const { data, error } = await supabase.from('users').select('leo_id')

    if (error) {
      console.error('Error in testSupabase:', error);
      res.status(500).json({ success: false, message: "Failed to connect to Supabase", error: error.message });
    } else {
      res.json({ success: true, message: "Connected to Supabase successfully", data: data });
    }
  }

  return { getUserInfo, testSupabase };
};

