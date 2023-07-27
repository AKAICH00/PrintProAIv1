// Event listener for the Get User Info button click
document.getElementById('btnGetUserInfo').addEventListener('click', function() {
  fetch('/api/get-user-info')
    .then(response => response.json())
    .then(data => {
      document.getElementById('userInfo').innerText = JSON.stringify(data, null, 2);
    });
});

// Event listener for the image generation form submission
document.getElementById('imageGenerationForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const textInput = document.getElementById('textInput').value;
  console.log('Text input:', textInput); // Debugging statement

  fetch('/api/generate-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: textInput }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Data from server:', data); // Debugging statement
    document.getElementById('imageGenerationResult').innerHTML = `Image ID: ${data.imageId}`;

    // Show the spinner
    document.getElementById('spinner').style.display = 'block';
    console.log(data.imageId)
    // Start a timer to periodically fetch the image URL
    const timerId = setInterval(() => {
      fetch(`/api/retrieve-image/${data.imageId}`)
        .then(response => response.json())
        .then(data => {
          if (data.imageLink) {
            console.log(data)
            // If the image URL is available, update the src attribute of the img element and the text content of the p element
            document.getElementById('generatedImage').src = data.imageLink;
            document.getElementById('imageUrl').textContent = data.imageLink;

            // Stop the timer and hide the spinner
            clearInterval(timerId);
            document.getElementById('spinner').style.display = 'none';
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, 10000); // Check every 5 seconds
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});
