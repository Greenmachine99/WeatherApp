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