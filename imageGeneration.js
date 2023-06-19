// imageGeneration.js

module.exports = function(sdk, supabase) {
  async function generateImage(req, res) {
    try {
      // Get the text input from the request body
      const textInput = req.body.text;
      console.log('Text input:', textInput); // Debugging statement

      // Call the Leonardo API's image generation endpoint
      const response = await sdk.createGeneration({
        prompt: textInput,
        modelId: '6bef9f1b-29cb-40c7-b9df-32b51c1f67d3', // Leonardo Creative
        width: 512,
        height: 512,
        presetStyle: 'LEONARDO',
        public: false,
        promptMagic: true,
        controlNet: false,
        sd_version: 'v2',
        num_images: 1,
        num_inference_steps: 30,
        guidance_scale: 7,
        tiling: true
      });

      console.log('Leonardo API response:', response); // Debugging statement

      // Check the response status and extract the image ID from the response data
      const imageId = response.data.sdGenerationJob.generationId;

      // Store the input and output in the Supabase 'images' table
      const { data: upsertData, error: upsertError } = await supabase
        .from('images')
        .upsert({
          input: textInput,
          output: imageId
        });

      console.log('Supabase upsert response:', upsertData, upsertError); // Debugging statement

      // Send the image ID back to the client
      res.json({ imageId: imageId });
    } catch (error) {
      console.error('Error in generateImage:', error); // Debugging statement
      res.status(500).json({ error: 'Failed to generate image.' });
    }
  }

  return { generateImage };
};
