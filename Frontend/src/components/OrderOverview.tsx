import { useContext } from "react";
import ShoppingCartContext from "../context/ShoppingCartContext";
import OrderDetailsContext from "../context/OrderDetailsContext";
import "./OrderOverview.css";

function OrderOverview() {
  const { cart } = useContext(ShoppingCartContext);
  const { orderDetails } = useContext(OrderDetailsContext);

  return (
    <>
      <h2>Order Overview:</h2>
      <div className="orderoverview">
        <h2>Your order:</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <h3>{item.name.toUpperCase()}</h3>
              <h3>Amount: {item.amount}</h3>
            </li>
          ))}
        </ul>
        {orderDetails.takeaway ? (
          <h2>Takeaway Order</h2>
        ) : (
          <h2>Your table is: {orderDetails.tableNumber}</h2>
        )}
      </div>
    </>
  );
}

export default OrderOverview;
