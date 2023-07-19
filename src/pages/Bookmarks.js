import Card from "../components/Card";

const Bookmarks = () => {
  const existingItems = JSON.parse(localStorage.getItem("bookmarks")) || [];

  console.log(existingItems);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {existingItems &&
        existingItems.map((forecastItem) => (
          <div key={forecastItem.date}>
            <Card forecastItem={forecastItem} />
          </div>
        ))}
    </div>
  );
};

export default Bookmarks;
