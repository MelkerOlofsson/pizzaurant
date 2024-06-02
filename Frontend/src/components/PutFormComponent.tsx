import { useState, useEffect } from "react";
import "./PutFormComponent.css";

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

function PutFormComponent() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [selectedFood, setSelectedFood] = useState({
    id: "",
    menuName: "",
    price: "",
    vegetarian: false,
    vegan: false,
    glutenFree: false,
  });
  const [selectedDrink, setSelectedDrink] = useState({
    id: "",
    drinkName: "",
    price: "",
    alcohol: false,
  });

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

  function onFoodSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const food = JSON.parse(event.target.value);
    setSelectedFood({
      ...selectedFood,
      id: food.id,
      menuName: food.menu_name,
      price: food.price,
      vegetarian: food.vegetarian === 1 ? true : false,
      vegan: food.vegan === 1 ? true : false,
      glutenFree: food.gluten_free === 1 ? true : false,
    });
  }

  function onDrinkSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const drink = JSON.parse(event.target.value);
    setSelectedDrink({
      ...selectedDrink,
      id: drink.id,
      drinkName: drink.drink_name,
      price: drink.price,
      alcohol: drink.alcohol === 1 ? true : false,
    });
  }

  function onFoodChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;
    setSelectedFood((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function onDrinkChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;
    setSelectedDrink((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target.className;

    if (form === "foodformput") {
      fetch(`/foods?food=${selectedFood.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedFood),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          setSelectedFood({
            id: "",
            menuName: "",
            price: "",
            vegetarian: false,
            vegan: false,
            glutenFree: false,
          });
          fetchFoodsAndDrinks();
        })
        .catch((error) => {
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
          alert(
            "There was a problem submitting the form. Please try again later."
          );
        });
    } else if (form === "drinkformput") {
      fetch(`/drinks?drink=${selectedDrink.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedDrink),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          setSelectedDrink({
            id: "",
            drinkName: "",
            price: "",
            alcohol: false,
          });
          fetchFoodsAndDrinks();
        })
        .catch((error) => {
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
          alert(
            "There was a problem submitting the form. Please try again later."
          );
        });
    }
  }

  return (
    <>
      <h2 className="header">Change Items</h2>
      <section className="putsection">
        <div className="foodcontainer">
          <h2>Change Food</h2>
          <select name="foodSelect" id="foodSelect" onChange={onFoodSelect}>
            {foods.map((food) => (
              <option key={food.id} value={JSON.stringify(food)}>
                {food.menu_name.toUpperCase()}
              </option>
            ))}
          </select>
          <form className="foodformput" onSubmit={handleSubmit}>
            <label htmlFor="id">ID:</label>
            <input
              type="number"
              name="id"
              id="id"
              value={selectedFood.id}
              disabled
              readOnly
            />
            <label htmlFor="foodNamePut">Menu Name:</label>
            <input
              type="text"
              name="menuName"
              id="foodNamePut"
              value={selectedFood.menuName}
              onChange={onFoodChange}
            />
            <label htmlFor="foodPricePut">Price:</label>
            <input
              type="number"
              name="price"
              id="foodPricePut"
              value={selectedFood.price}
              onChange={onFoodChange}
            />
            <label htmlFor="vegetarianPut">Vegetarian:</label>
            <input
              type="checkbox"
              name="vegetarian"
              id="vegetarianPut"
              checked={selectedFood.vegetarian}
              onChange={onFoodChange}
            />
            <label htmlFor="veganPut">Vegan:</label>
            <input
              type="checkbox"
              name="vegan"
              id="veganPut"
              checked={selectedFood.vegan}
              onChange={onFoodChange}
            />
            <label htmlFor="glutenFreePut">Gluten Free:</label>
            <input
              type="checkbox"
              name="glutenFree"
              id="glutenFreePut"
              checked={selectedFood.glutenFree}
              onChange={onFoodChange}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="drinkcontainer">
          <h2>Change Drink</h2>
          <select name="drinkSelect" id="drinkSelect" onChange={onDrinkSelect}>
            {drinks.map((drink) => (
              <option key={drink.id} value={JSON.stringify(drink)}>
                {drink.drink_name.toUpperCase()}
              </option>
            ))}
          </select>
          <form className="drinkformput" onSubmit={handleSubmit}>
            <label htmlFor="drinkId">ID:</label>
            <input
              type="number"
              name="id"
              id="drinkId"
              value={selectedDrink.id}
              disabled
              readOnly
            />
            <label htmlFor="drinkNamePut">Drink Name:</label>
            <input
              type="text"
              name="drinkName"
              id="drinkNamePut"
              value={selectedDrink.drinkName}
              onChange={onDrinkChange}
            />
            <label htmlFor="pricePut">Price:</label>
            <input
              type="number"
              name="price"
              id="pricePut"
              value={selectedDrink.price}
              onChange={onDrinkChange}
            />
            <label htmlFor="alcoholPut">Alcohol:</label>
            <input
              type="checkbox"
              name="alcohol"
              id="alcoholPut"
              checked={selectedDrink.alcohol}
              onChange={onDrinkChange}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </section>
    </>
  );
}

export default PutFormComponent;
