import { useState } from "react";
import "./Order.css";
import ChooseItems from "../components/ChooseItems.tsx";
import OrderDetails from "../components/OrderDetails.tsx";
import ShoppingCartContext, {
  ShoppingCartItem,
} from "../context/ShoppingCartContext.tsx";
import OrderDetailsContext, {
  OrderDetailsInformation,
} from "../context/OrderDetailsContext.tsx";
import OrderOverview from "../components/OrderOverview.tsx";

function Order() {
  const [cart, setCart] = useState<ShoppingCartItem[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetailsInformation>({
    takeaway: false,
    tableNumber: null,
  });
  const [stepNumber, setStepNumber] = useState<number>(1);

  function handleConfirm() {
    fetch("/confirm-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderDetails, cart }),
    })
      .then((response) => {
        response.json;
        if (response.status !== 201) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Fail fetch");
      });
    setStepNumber(stepNumber + 1);
  }

  return (
    <>
      {/* <h2 className="ordersection">Still in development</h2> */}
      <ShoppingCartContext.Provider value={{ cart, setCart }}>
        <OrderDetailsContext.Provider value={{ orderDetails, setOrderDetails }}>
          <section className="ordersection">
            <div className="ordercontainer">
              {stepNumber === 1 && (
                <>
                  <ChooseItems />
                  <input
                    disabled={cart.length < 1}
                    type="button"
                    value="Order Details"
                    onClick={() => setStepNumber(stepNumber + 1)}
                  />
                </>
              )}
              {stepNumber === 2 && (
                <>
                  <OrderDetails />
                  <input
                    disabled={
                      orderDetails.tableNumber === null &&
                      !orderDetails.takeaway
                    }
                    type="button"
                    value="Overview"
                    onClick={() => setStepNumber(stepNumber + 1)}
                  />
                </>
              )}
              {stepNumber === 3 && (
                <>
                  <OrderOverview />
                  <input
                    type="button"
                    value="Confirm Order"
                    onClick={handleConfirm}
                  />
                </>
              )}
              {stepNumber === 4 && (
                <>
                  <div className="thankyoumessage">
                    <h2>Thank you for your order!</h2>
                    <h3>We'll prepare your meal right away!</h3>
                  </div>
                </>
              )}
            </div>
            {stepNumber !== 1 && stepNumber < 4 && (
              <input
                type="button"
                value="Back"
                onClick={() => setStepNumber(stepNumber - 1)}
              />
            )}
            {stepNumber < 4 && (
              <div className="ordersteps">
                <h3>{stepNumber}</h3>
              </div>
            )}
          </section>
        </OrderDetailsContext.Provider>
      </ShoppingCartContext.Provider>
    </>
  );
}

export default Order;
