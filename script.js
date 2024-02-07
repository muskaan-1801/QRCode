var scanner = new Instascan.Scanner({ 
  video: document.getElementById('preview'), 
  scanPeriod: 5, 
  mirror: false 
});

// Modify your existing scan listener to make an HTTP POST request to your backend server
scanner.addListener('scan', function(content) {
  document.getElementById('scannedContent').innerText = "Scanned: " + content;

  // Make an HTTP POST request to your backend server
  fetch('http://localhost:3000/scan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content: content })
  })
  .then(response => response.json())
  .then(data => {
    // Display the scanned data on the screen
    console.log(data); // Log the scanned data to the console
    // Here you can manipulate the DOM to display the scanned data as needed
  })
  .catch(error => console.error('Error scanning QR code:', error));
});


