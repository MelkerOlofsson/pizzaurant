import { useState, useEffect, useContext } from "react";
import ShoppingCartContext from "../context/ShoppingCartContext";
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
  const { cart, setCart } = useContext(ShoppingCartContext);

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

  function handleAddItem(id: number, itemName: string, itemType: string) {
    const checkIfExist = cart.filter((item) => item.id === id);
    if (checkIfExist.find((item) => item.type === itemType)) {
      const indexOfItem = cart.findIndex(
        (item) => item.id === id && item.type === itemType
      );
      const updatedCart = [...cart];
      updatedCart[indexOfItem].amount += 1;
      setCart(updatedCart);
    } else {
      const newItem = {
        id: id,
        name: itemName,
        amount: 1,
        type: itemType,
      };
      setCart([...cart, newItem]);
    }
  }

  function handleRemoveItem(id: number, itemType: string) {
    const checkIfExist = cart.find(
      (item) => item.id === id && item.type === itemType
    );
    if (checkIfExist) {
      const indexOfItem = cart.findIndex(
        (item) => item.id === id && item.type === itemType
      );
      if (cart[indexOfItem].amount > 1) {
        const updatedCart = [...cart];
        updatedCart[indexOfItem].amount -= 1;
        setCart(updatedCart);
      } else {
        const updatedCart = cart.filter(
          (_item, index) => index !== indexOfItem
        );
        setCart(updatedCart);
      }
    }
  }

  return (
    <>
      <h1>Choose items:</h1>
      <form className="itemlist">
        <div className="fooditems">
          <h2>Foods</h2>
          <ul>
            {foods.map((food) => (
              <li key={food.id}>
                <h2>{food.menu_name.toUpperCase()}</h2>
                <h3>{food.price}kr</h3>
                <div className="amountcontainer">
                  {cart.find(
                    (item) => item.id === food.id && item.type === "food"
                  ) ? (
                    <h4>
                      {
                        cart[
                          cart.findIndex(
                            (item) =>
                              item.id === food.id && item.type === "food"
                          )
                        ].amount
                      }
                    </h4>
                  ) : (
                    <h4>0</h4>
                  )}
                  <input
                    type="button"
                    value="Add"
                    onClick={() =>
                      handleAddItem(food.id, food.menu_name, "food")
                    }
                  />

                  {cart.find(
                    (item) => item.id === food.id && item.type === "food"
                  ) && (
                    <input
                      type="button"
                      value="Remove"
                      onClick={() => handleRemoveItem(food.id, "food")}
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <br />
        <div className="drinkitems">
          <h2>Drinks</h2>
          <ul>
            {drinks.map((drink) => (
              <li key={drink.id}>
                <h2>{drink.drink_name.toUpperCase()}</h2>
                <h3>{drink.price}kr</h3>
                <div className="amountcontainer">
                  {cart.find(
                    (item) => item.id === drink.id && item.type === "drink"
                  ) ? (
                    <h4>
                      {
                        cart[
                          cart.findIndex(
                            (item) =>
                              item.id === drink.id && item.type === "drink"
                          )
                        ].amount
                      }
                    </h4>
                  ) : (
                    <h4>0</h4>
                  )}
                  <input
                    type="button"
                    value="Add"
                    onClick={() =>
                      handleAddItem(drink.id, drink.drink_name, "drink")
                    }
                  />
                  {cart.find(
                    (item) => item.id === drink.id && item.type === "drink"
                  ) && (
                    <input
                      type="button"
                      value="Remove"
                      onClick={() => handleRemoveItem(drink.id, "drink")}
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </>
  );
}

export default ChooseItems;
