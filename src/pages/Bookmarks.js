import Card from "../components/Card";
import { removeFromLocalStorage } from "../bookmarkHelpers";
import { useState } from "react";

const Bookmarks = () => {
  const existingItems = JSON.parse(localStorage.getItem("bookmarks")) || [];

  const [bookmarkedDays, setBookmarkedDays] = useState(existingItems);

  console.log(existingItems);

  const cardDeleteHandler = (forecastItem) => {
    removeFromLocalStorage("bookmarks", forecastItem.id);
    setBookmarkedDays(JSON.parse(localStorage.getItem("bookmarks")) || []);
  };

  return (
    <div className="bg-main-color-dark h-full p-8">
      <h1 className="text-3xl text-center text-white mb-6">Bookmarks</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
        {bookmarkedDays &&
          bookmarkedDays.map((forecastItem) => (
            <div>
              <Card
                forecastItem={forecastItem}
                isBookmarked={true}
                cardDeleteHandler={cardDeleteHandler}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Bookmarks;
