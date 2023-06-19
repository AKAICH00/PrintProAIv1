// Event listener for the "Get User Info" button
document.getElementById('btnGetUserInfo').addEventListener('click', function() {
  fetch('/api/get-user-info')
    .then(response => response.json())
    .then(data => {
      document.getElementById('userInfo').innerText = JSON.stringify(data, null, 2);
    })
    .catch(err => console.error(err));
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
  .then(response => {
    console.log('Server response:', response); // Debugging statement
    return response.json();
  })
  .then(data => {
    console.log('Data from server:', data); // Debugging statement
    document.getElementById('imageGenerationResult').innerHTML = `Image ID: ${data.imageId}`;
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});
