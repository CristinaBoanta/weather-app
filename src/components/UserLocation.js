import { useEffect } from 'react';

const UserLocation = (props) => {

    const { sendCityData } = props;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getCityName(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported in this browser.');
    }
  }, []);

  const getCityName = (latitude, longitude) => {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.address) {
          const cityData = data.address.city || data.address.town || data.address.village;
          sendCityData(cityData);
        }
      })
      .catch((error) => {
        console.error('Error fetching city name:', error);
      });
  };

  return (
    <></>
  );
};

export default UserLocation;
