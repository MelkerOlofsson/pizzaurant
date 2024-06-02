import { useState } from "react";
import "./PostFormComponent.css";

interface FoodForm {
  menuName: string;
  price: string;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
}

interface DrinkForm {
  drinkName: string;
  price: string;
  alcohol: boolean;
}

function FormComponent() {
  const [foodForm, setFoodForm] = useState<FoodForm>({
    menuName: "",
    price: "",
    vegetarian: false,
    vegan: false,
    glutenFree: false,
  });

  const [drinkForm, setDrinkForm] = useState<DrinkForm>({
    drinkName: "",
    price: "",
    alcohol: false,
  });

  function handleFoodChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;
    setFoodForm((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleDrinkChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;
    setDrinkForm((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target.className;

    if (form === "foodform") {
      fetch("/foods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(foodForm),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          setFoodForm({
            menuName: "",
            price: "",
            vegetarian: false,
            vegan: false,
            glutenFree: false,
          });
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
    } else if (form === "drinkform") {
      fetch("/drinks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(drinkForm),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          setDrinkForm({
            drinkName: "",
            price: "",
            alcohol: false,
          });
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
      <h2 className="header">Add Items</h2>
      <section className="formsection">
        <form className="foodform" onSubmit={handleSubmit}>
          <h2>Add Food</h2>
          <label htmlFor="menuName">Menu Name:</label>
          <input
            type="text"
            id="menuName"
            name="menuName"
            value={foodForm.menuName}
            onChange={handleFoodChange}
            required
          />
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={foodForm.price}
            onChange={handleFoodChange}
            required
          />
          <label htmlFor="vegetarian">Vegetarian:</label>
          <input
            type="checkbox"
            id="vegetarian"
            name="vegetarian"
            checked={foodForm.vegetarian}
            onChange={handleFoodChange}
          />
          <label htmlFor="vegan">Vegan:</label>
          <input
            type="checkbox"
            id="vegan"
            name="vegan"
            checked={foodForm.vegan}
            onChange={handleFoodChange}
          />
          <label htmlFor="glutenFree">Gluten Free:</label>
          <input
            type="checkbox"
            id="glutenFree"
            name="glutenFree"
            checked={foodForm.glutenFree}
            onChange={handleFoodChange}
          />
          <input type="submit" value="Submit" />
        </form>
        <form className="drinkform" onSubmit={handleSubmit}>
          <h2>Add Drink</h2>
          <label htmlFor="drinkName">Drink Name:</label>
          <input
            type="text"
            id="drinkName"
            name="drinkName"
            value={drinkForm.drinkName}
            onChange={handleDrinkChange}
            required
          />
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={drinkForm.price}
            onChange={handleDrinkChange}
            required
          />
          <label htmlFor="alcohol">Alcohol:</label>
          <input
            type="checkbox"
            id="alcohol"
            name="alcohol"
            checked={drinkForm.alcohol}
            onChange={handleDrinkChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </section>
    </>
  );
}

export default FormComponent;
