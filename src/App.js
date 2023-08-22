import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaWindowClose } from "react-icons/fa";
import env from "react-dotenv";

import Card from "./components/Card";
import Button from "./components/Button";
import Spinner from './components/Spinner';
import UserLocation from "./components/UserLocation";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [cityData, setCityData] = useState('');

  const fetchWeatherData = (city) => {
    setIsLoading(true);

    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${env.API_KEY}&days=3&q=${city}`
    )
      .then((response) => {
        if (!response.ok) {
          toast.error("Error");
          throw new Error("Response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setIsLoading(false);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeatherData(searchInputValue);
    }
  };

  const deleteInputValue = () => {
    setSearchInputValue("");
  };

  const handleCityData = (city) => {
    setCityData(city);
  };

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

  useEffect(() => {
    if (cityData) {
      fetchWeatherData(cityData);
    }
  }, [cityData]);

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
          setCityData(cityData);
        }
      })
      .catch((error) => {
        console.error('Error fetching city name:', error);
      });
  };

  return (
    <div className="App bg-main-color-dark px-6">
      <ToastContainer />

      {loading ? (
        <Spinner />
      ) : null}

      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl text-center text-white mb-6 flex flex-col">
            <span className="pb-5">Search for a city</span>{" "}
            <span className="font-bold">
              {weatherData && weatherData.location.name}
            </span>
          </h1>

          <UserLocation sendCityData={handleCityData} />

          <div className="flex justify-center mb-4">
            <div className="relative">
              <input
                className="px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-white pr-12"
                value={searchInputValue}
                onChange={(event) => setSearchInputValue(event.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter location..."
              />
              <button
                onClick={deleteInputValue}
                className="absolute right-2 top-2"
              >
                <FaWindowClose color="#0f0725" size={25} />
              </button>
            </div>
            <Button label="Search" onClick={fetchWeatherData} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-4">
          {weatherData &&
            weatherData.forecast.forecastday.map((forecastItem) => (
              <div key={forecastItem.date}>
                <Card
                  forecastItem={forecastItem}
                  location={weatherData.location.name}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
