import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import env from "react-dotenv";

import Card from "./components/Card";

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
        console.log(data);
        setWeatherData(data);
      });
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
            <input
              className="px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-white"
              value={searchInputValue}
              onChange={(event) => setSearchInputValue(event.target.value)}
              placeholder="Enter location..."
            />
            <button
              className="ml-2 px-4 py-2 rounded-md bg-white text-0f1b28 font-bold hover:bg-opacity-80 transition"
              onClick={fetchWeatherData}
            >
              Search
            </button>
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
