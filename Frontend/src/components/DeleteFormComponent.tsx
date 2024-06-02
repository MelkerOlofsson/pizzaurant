import { useState, useEffect } from "react";
import "./DeleteFormComponent.css";

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

function DeleteFormComponent() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [foodID, setFoodID] = useState<number>();
  const [drinkID, setDrinkID] = useState<number>();

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

  function onFoodChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setFoodID(parseInt(event.target.value));
  }

  function onDrinkChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setDrinkID(parseInt(event.target.value));
  }

  function handleDeleteFood(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch("/foods/" + foodID, {
      method: "delete",
    }).then(() => {
      fetchFoodsAndDrinks();
    });
  }

  function handleDeleteDrink(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch("/drinks/" + drinkID, {
      method: "delete",
    }).then(() => {
      fetchFoodsAndDrinks();
    });
  }

  return (
    <>
      <h2 className="header">Delete Items</h2>
      <section className="deletesection">
        <form className="deletefoodform" onSubmit={handleDeleteFood}>
          <h2>Remove Food</h2>
          <select name="deletefood" id="deletefood" onChange={onFoodChange}>
            {foods.map((food) => (
              <option key={food.id} value={food.id}>
                {food.menu_name.toUpperCase()}
              </option>
            ))}
          </select>
          <input type="submit" value="Submit" />
        </form>
        <form className="deletedrinkform" onSubmit={handleDeleteDrink}>
          <h2>Remove Drink</h2>
          <select name="deletedrink" id="deletedrink" onChange={onDrinkChange}>
            {drinks.map((drink) => (
              <option key={drink.id} value={drink.id}>
                {drink.drink_name.toUpperCase()}
              </option>
            ))}
          </select>
          <input type="submit" value="Submit" />
        </form>
      </section>
    </>
  );
}

export default DeleteFormComponent;
