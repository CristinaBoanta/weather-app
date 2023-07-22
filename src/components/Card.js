import React, { useState } from "react";
import { FaAngleDown, FaAngleUp, FaRegBookmark } from "react-icons/fa";
import { addToLocalStorage } from "../bookmarkHelpers";
import { v4 as uuidv4 } from "uuid";
import "../index.css";
import mici from "../assets/mici_prep.png";
import anger from "../assets/angry.png";


const Card = (props) => {
  const { forecastItem, isBookmarked, cardDeleteHandler } = props;

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

  const saveBookmark = () => {
    addToLocalStorage("bookmarks", { ...forecastItem, id: uuidv4() });
  };

  const isGoodForMititei =
    forecastItem.day.daily_chance_of_rain <= 20 &&
    forecastItem.day.avgtemp_c >= 20;

  return (
    <div className="bg-gradient-to-br from-main-color-light to-main-color p-8 rounded-lg shadow-md text-white relative">
      <div className="flex flex-col items-center">
        <button
          onClick={saveBookmark}
          className="hover:text-opacity-80 transition absolute right-[30px]"
        >
          <FaRegBookmark size="20" />
        </button>
        {isBookmarked && (
          <button
            onClick={() => cardDeleteHandler(forecastItem)}
            className="text-red-500 font-bold hover:text-opacity-80 transition"
          >
            Delete
          </button>
        )}

        <h2 className="text-3xl font-bold mt-4 mb-2">
          {getDayOfTheWeek(forecastItem.date)}
        </h2>

        <div className="flex items-center">
          <img src={forecastItem.day.condition.icon} alt="icon" className="w-16 h-16" />
          <p className="text-lg ml-2 mt-2">
            {forecastItem.day.condition.text}
          </p>
        </div>

        <p className="mt-2">
          {forecastItem.day.daily_chance_of_rain} % chance of rain
        </p>

        <button
          onClick={toggleDivCollapse}
          className="hover:text-opacity-80 transition mt-4"
        >
          {isDivCollapsed ? <FaAngleDown size={25} /> : <FaAngleUp size={25} />}
        </button>
      </div>

      <div className={`content ${isDivCollapsed ? "collapsed" : "expanded"} mt-4 flex flex-col items-center`}>
        <p className="">
          Max temp: {Math.round(forecastItem.day.maxtemp_c)}° C
        </p>
        <p className="mt-2">
          Min temp: {Math.round(forecastItem.day.mintemp_c)}° C
        </p>
        <p className="mt-2">
          Avg temp: {Math.round(forecastItem.day.avgtemp_c)}° C
        </p>
        <p className="mt-2">
          Avg humidity: {forecastItem.day.avghumidity} %
        </p>
        <p className="mt-2">
          {isGoodForMititei ? (
            <span className="font-semibold">Good for mititei <img src={mici} className="w-[5rem] h-[5rem] inline-block ml-2" alt="mici" /> </span>
          ) : (
            <span className="text-red-500 font-semibold">No mititei today, boss <img src={anger} className="w-[5rem] h-[5rem] inline-block ml-2" alt="angry-emoji" /> </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Card;