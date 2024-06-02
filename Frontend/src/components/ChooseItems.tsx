import { useState, useEffect } from "react";
import "./ChooseItems.css";

interface Food {
  id: number;
  menu_name: string;
  price: number;
  vegetarian: number;
  vegan: number;
  gluten_free: number;
}

interface Drink {
  id: number;
  drink_name: string;
  price: number;
  alcohol: number;
}
function ChooseItems() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [amounts, setAmounts] = useState<{ [key: number]: number }>({});
  // const {id, amount}

  function fetchFoodsAndDrinks() {
    fetch("/foods")
      .then((resp) => resp.json())
      .then((res) => {
        setFoods(res);
      });
    fetch("/drinks")
      .then((resp) => resp.json())
      .then((res) => {
        setDrinks(res);
      });
  }

  useEffect(() => {
    fetchFoodsAndDrinks();
  }, []);

  function handleAddItem(id: number) {
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [id]: (prevAmounts[id] || 0) + 1,
    }));
  }

  function handleRemoveItem(id: number) {
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [id]: (prevAmounts[id] || 0) - 1,
    }));
  }

  return (
    <>
      <h1>Choose items:</h1>
      <form>
        <h2>Foods</h2>
        <ul>
          {foods.map((food) => (
            <li key={food.id}>
              <h2>{food.menu_name}</h2>
              <h3>{food.price}kr</h3>
              <div className="amountcontainer">
                <h4>{amounts[food.id] || 0}</h4>
                <input
                  type="button"
                  value="Lägg till"
                  onClick={() => handleAddItem(food.id)}
                />
                {amounts[food.id] > 0 && (
                  <input
                    type="button"
                    value="Ångra"
                    onClick={() => handleRemoveItem(food.id)}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
        <h2>Drinks</h2>
        <ul>
          {drinks.map((drink) => (
            <li key={drink.id}>
              <h2>{drink.drink_name}</h2>
              <h3>{drink.price}kr</h3>
              <div className="amountcontainer">
                <h4>{amounts[drink.id] || 0}</h4>
                <input
                  type="button"
                  value="Lägg till"
                  onClick={() => handleAddItem(drink.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </form>

      {<input type="button" value="Contacts" />}
    </>
  );
}

export default ChooseItems;
