import "./index.css";
import { useState, useEffect } from "react";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // fetch('http://api.weatherapi.com/v1/current.json?key=05f05a14a0ca402984b03203233001&q=Oradea')
    // .then((response) => {
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   return response.json();
    // })
    // .then((data) => console.log(data))

    fetch(
      "http://api.weatherapi.com/v1/forecast.json?key=05f05a14a0ca402984b03203233001&days=3&q=Oradea"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      });
  }, []);
  

  const getDayOfTheWeek = (dateString) => {
    const dateObj = new Date(dateString);
    const dayOfWeekText = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    return dayOfWeekText;
  }

  return (
    <div className="App h-full">
      <div className="bg-gray-100 h-full">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold text-center mb-6">
            Weather App Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weatherData &&
              weatherData.forecast.forecastday.map((forecastItem) => {
                return (
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <h2 className="text-xl font-bold mb-2">{getDayOfTheWeek(forecastItem.date)}</h2>
                    </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
