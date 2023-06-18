document.getElementById('btnGetUserInfo').addEventListener('click', function() {
  fetch('/api/get-user-info')
    .then(response => response.json())
    .then(data => {
      document.getElementById('userInfo').innerText = JSON.stringify(data, null, 2);
    })
    .catch(err => console.error(err));
});
