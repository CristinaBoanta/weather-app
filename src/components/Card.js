import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import "../index.css";

const Card = (props) => {
  const { forecastItem } = props;

  const [isDivCollapsed, setIsDivCollapsed] = useState(true);

  const toggleDivCollapse = () => {
    setIsDivCollapsed((prevState) => !prevState);
  };

  const getDayOfTheWeek = (dateString) => {
    const dateObj = new Date(dateString);
    const dayOfWeekText = dateObj.toLocaleDateString("en-US", {
      weekday: "long",
    });
    return dayOfWeekText;
  };

  const isGoodForMititei = forecastItem.day.daily_chance_of_rain <= 20 && forecastItem.day.avgtemp_c >= 25;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2">
          {getDayOfTheWeek(forecastItem.date)}
        </h2>

        <p>{forecastItem.day.condition.text}</p>
        <div>
          <img src={forecastItem.day.condition.icon} alt="icon" />
        </div>
        <p>{forecastItem.day.daily_chance_of_rain} % chance of rain</p>

        <button onClick={toggleDivCollapse}>
          {isDivCollapsed ? <FaAngleDown size={25} /> : <FaAngleUp size={25} />}
        </button>
      </div>

      <div className={`content ${isDivCollapsed ? "collapsed" : "expanded"}`}>
        <p>Max temp: {Math.round(forecastItem.day.maxtemp_c)}° C</p>
        <p>Min temp: {Math.round(forecastItem.day.mintemp_c)}° C</p>
        <p>Avg temp: {Math.round(forecastItem.day.avgtemp_c)}° C</p>
        <p>Avg humidity: {forecastItem.day.avghumidity} %</p>
        <p>{isGoodForMititei ? <div>Good for mititei</div> : <div>No mititei today, boss</div>}</p>
      </div>
    </div>
  );
};

export default Card;
