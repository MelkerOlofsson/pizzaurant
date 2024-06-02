import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

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

function Menu() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [drinks, setDrinks] = useState<Drink[]>([]);

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

  return (
    <>
      <section className="menusection" id="menuID">
        <div className="menucontainer">
          <div className="orderlinkcontainer">
            <h3>Feeling hungry?</h3>
            <Link className="orderlink" to="/order">
              <h2>Place an order!</h2>
            </Link>
          </div>
          <img
            className="menuimg"
            src="/cool_7325681.png"
            alt="Cool Pizza Icon"
          />
          <section className="foodanddrinkcontainer">
            <div className="foodsection">
              <h3>Foods:</h3>
              <ul>
                {foods.map(
                  (food) =>
                    food.vegetarian !== 1 &&
                    food.vegan !== 1 &&
                    food.gluten_free !== 1 && (
                      <li key={food.id}>
                        <h4>{food.menu_name.toUpperCase()}</h4>
                        <h4>{food.price} Kr</h4>
                      </li>
                    )
                )}
              </ul>
              <h3>Vegetarian:</h3>
              <ul>
                {foods.map(
                  (food) =>
                    food.vegetarian === 1 && (
                      <li key={food.id}>
                        <h4>{food.menu_name.toUpperCase()}</h4>
                        <h4>{food.price} Kr</h4>
                      </li>
                    )
                )}
              </ul>
              <h3>Vegan:</h3>
              <ul>
                {foods.map(
                  (food) =>
                    food.vegan === 1 && (
                      <li key={food.id}>
                        <h4>{food.menu_name.toUpperCase()}</h4>
                        <h4>{food.price} Kr</h4>
                      </li>
                    )
                )}
              </ul>
              <h3>Gluten-free:</h3>
              <ul>
                {foods.map(
                  (food) =>
                    food.gluten_free === 1 && (
                      <li key={food.id}>
                        <h4>{food.menu_name.toUpperCase()}</h4>
                        <h4>{food.price} Kr</h4>
                      </li>
                    )
                )}
              </ul>
            </div>
            <div className="drinksection">
              <h3>Drinks:</h3>
              <ul>
                {drinks.map(
                  (drink) =>
                    drink.alcohol !== 1 && (
                      <li key={drink.id}>
                        <h4>{drink.drink_name.toUpperCase()}</h4>
                        <h4>{drink.price} Kr</h4>
                      </li>
                    )
                )}
              </ul>
              <h3>Alcoholic Beverages:</h3>
              <ul>
                {drinks.map(
                  (drink) =>
                    drink.alcohol === 1 && (
                      <li key={drink.id}>
                        <h4>{drink.drink_name.toUpperCase()}</h4>
                        <h4>{drink.price} Kr</h4>
                      </li>
                    )
                )}
              </ul>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default Menu;
