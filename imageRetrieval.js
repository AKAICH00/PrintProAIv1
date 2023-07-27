// imageRetrieval.js

const fetch = require('node-fetch');

module.exports = (sdk) => {
  async function retrieveImage(req, res) {
    const generationId = req.params.generationId;
    console.log(`Retrieving image with generationId: ${generationId}`);

    try {
      const { data, error } = await sdk.getGenerationById({ id: generationId });

      if (error) {
        console.error(`Error in retrieveImage: ${error.message}`);
        res.status(500).send({ error: error.message });
      } else {
        console.log(`Leonardo API response: ${JSON.stringify(data, null, 2)}`);
        if (data.generations_by_pk.generated_images && data.generations_by_pk.generated_images.length > 0) {
          const imageUrl = data.generations_by_pk.generated_images[0].url;
          // Create a link to the image
          const imageLink = imageUrl;
          res.send({ imageLink });
        } else {
          console.error(`No generated images found for generationId: ${generationId}`);
          res.status(404).send({ error: 'No generated images found' });
        }
      }
    } catch (err) {
      console.error(`Error in retrieveImage: ${err.message}`);
      res.status(500).send({ error: err.message });
    }
  }

  return { retrieveImage };
};
