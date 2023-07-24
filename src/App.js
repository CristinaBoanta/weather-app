import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaWindowClose } from "react-icons/fa";
import env from "react-dotenv";

import Card from "./components/Card";
import Button from "./components/Button";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchInputValue, setSearchInputValue] = useState("");

  const fetchWeatherData = () => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${env.API_KEY}&days=3&q=${searchInputValue}`
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
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeatherData();
    }
  };

  const deleteInputValue = () => {
    setSearchInputValue("");
  };

  return (
    <div className="App bg-main-color-dark h-full px-6">
      <ToastContainer />

      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl text-center text-white mb-6 flex flex-col">
            <span className="pb-5">Search for a city</span>{" "}
            <span className="font-bold">
              {weatherData && weatherData.location.name}
            </span>
          </h1>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {weatherData &&
            weatherData.forecast.forecastday.map((forecastItem) => (
              <div key={forecastItem.date}>
                <Card forecastItem={forecastItem} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
