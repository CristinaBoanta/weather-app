import Card from "../components/Card";
import { removeFromLocalStorage } from "../bookmarkHelpers";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

const Bookmarks = () => {
  const existingItems = JSON.parse(localStorage.getItem("bookmarks")) || [];

  const [bookmarkedDays, setBookmarkedDays] = useState(existingItems);

  const cardDeleteHandler = (forecastItem) => {
    removeFromLocalStorage("bookmarks", forecastItem.id);
    setBookmarkedDays(JSON.parse(localStorage.getItem("bookmarks")) || []);
    toast.success("Bookmark deleted");
  };

  return (
    <div className="bg-main-color-dark p-8">
      <ToastContainer />

      <h1 className="text-3xl text-center text-white mb-6">Bookmarks</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookmarkedDays &&
          bookmarkedDays.map((forecastItem) => (
            <div key={forecastItem.id}>
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
