const addToLocalStorage = (key, item) => {
    const existingItems = JSON.parse(localStorage.getItem(key)) || [];
    const updatedItems = [...existingItems, item];
    localStorage.setItem(key, JSON.stringify(updatedItems));
  };
  
  const removeFromLocalStorage = (key, id) => {
    const existingItems = JSON.parse(localStorage.getItem(key)) || [];
    const updatedItems = existingItems.filter((item) => item.id !== id);
    localStorage.setItem(key, JSON.stringify(updatedItems));
  };

export {addToLocalStorage, removeFromLocalStorage};