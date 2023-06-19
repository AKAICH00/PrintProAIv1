// imageRetrieval.js

module.exports = function(sdk, supabase) {
  async function retrieveImage(generationId) {
    try {
      // Get the generation details, including the image URL
      const generationResponse = await sdk.getGeneration({ generationId });
      const imageUrl = generationResponse.data.sdGeneration.imageUrl;

      // Store the image URL in the Supabase 'images' table
      const { data: insertData, error: insertError } = await supabase
        .from('images')
        .insert({
          leo_image_id: generationId,
          leo_image_url: imageUrl
        });

      console.log('Supabase insert response:', insertData, insertError); // Debugging statement

      return imageUrl;
    } catch (error) {
      console.error('Error in retrieveImage:', error); // Debugging statement
      throw error;
    }
  }

  return { retrieveImage };
};
// 
// // index.js