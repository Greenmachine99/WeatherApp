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
      // Add any additional headers if needed
    },
  });
  const data = await response.json();
  return data;
};