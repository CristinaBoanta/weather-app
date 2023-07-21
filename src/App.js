import "./index.css";
import 'react-toastify/dist/ReactToastify.css';

import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
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
      })
  };


  return (
    <div className="App h-full">

    <ToastContainer />

      <div className="bg-gray-300 h-full">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl text-center mb-6">
            Forecast for{" "}
            <span className="font-bold">
              {weatherData && weatherData.location.name}
            </span>
          </h1>

          <input value={searchInputValue} onChange={(event) => setSearchInputValue(event.target.value)} />
          <button onClick={fetchWeatherData}>Search</button>

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
    </div>
  );
};

export default App;
