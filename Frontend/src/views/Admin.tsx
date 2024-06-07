import PostFormComponent from "../components/PostFormComponent";
import DeleteFormComponent from "../components/DeleteFormComponent";
import PutFormComponent from "../components/PutFormComponent";
import "./Admin.css";
import LoginContext from "../context/LoginContext";
import { useContext, useEffect, useState } from "react";

interface Order {
  id: number;
  takeaway: number;
  table_number: number | null;
  customer_id: number | null;
}

interface FoodOrdered {
  order_id: number;
  food_item: number;
}

interface DrinkOrdered {
  order_id: number;
  drink_item: number;
}

interface OrdersTypes {
  orders: Order[];
  foods: FoodOrdered[];
  drinks: DrinkOrdered[];
}

function Admin() {
  const [ordersData, setOrdersData] = useState<OrdersTypes | null>(null);
  const { isLoggedIn } = useContext(LoginContext);

  // Hämta alla ordrar.
  useEffect(() => {
    fetch("/order-list")
      .then((response) => response.json())
      .then((result) => setOrdersData(result));
  }, []);

  // Funktioner ger antingen tillbaka en array med maten tillhörandes ordern eller en tom array.
  function getOrderFoods(orderId: number) {
    return ordersData?.foods.filter((food) => food.order_id === orderId) || [];
  }
  function getOrderDrinks(orderId: number) {
    return (
      ordersData?.drinks.filter((drink) => drink.order_id === orderId) || []
    );
  }

  return (
    <>
      {isLoggedIn === true && (
        <section className="adminsection">
          <h1 className="admin">ADMIN SETTINGS</h1>
          <PostFormComponent />
          <hr className="adminseparator" />
          <DeleteFormComponent />
          <hr className="adminseparator" />
          <PutFormComponent />
          <hr className="adminseparator" />
          <div className="placedorders">
            <h1>Placed Orders:</h1>
            {ordersData &&
              ordersData.orders.map((order) => (
                <div key={order.id} className="order">
                  <h2>Order ID: {order.id}</h2>
                  <p>Takeaway: {order.takeaway ? "Yes" : "No"}</p>
                  <p>
                    Table Number:{" "}
                    {order.table_number !== null ? order.table_number : "N/A"}
                  </p>
                  <h3>Foods:</h3>
                  <ul>
                    {getOrderFoods(order.id).map((food) => (
                      <li key={food.food_item}>
                        Food Item ID: {food.food_item}
                      </li>
                    ))}
                  </ul>
                  <h3>Drinks:</h3>
                  <ul>
                    {getOrderDrinks(order.id).map((drink) => (
                      <li key={drink.drink_item}>
                        Drink Item ID: {drink.drink_item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </section>
      )}
      {isLoggedIn === false && (
        <h2 className="noaccess">You do not have permission</h2>
      )}
    </>
  );
}

export default Admin;
