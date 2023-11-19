// Function to Retrieve Geolocation User
export const loadUserPosition = async () => {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve([position.coords.latitude, position.coords.longitude]);
          },
          (error) => {
            reject(error);
          }
        );
      });
    } else {
      return new Error("Geolocation is not supported by this browser.");
    }
  };

// Function to Retrieve GPS from API
export const loadSavedLocations = async () => {
  const response = await fetch('http://127.0.0.1:5000/gps', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

// Function to Save Geolocation to API
export const saveLocation = (name, lat, lon) => {
  fetch('http://127.0.0.1:5000/gps', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      name: name,
    })
    }).then((response) => {
      if (!response.ok) {
        throw new Error('HTTP Error: ' + response.status)
      }
      return response.json()
    }).then(data => {
      console.log('Post request successful')
    }).catch(error => {
      console.log('Post request failed', error)
    })
}