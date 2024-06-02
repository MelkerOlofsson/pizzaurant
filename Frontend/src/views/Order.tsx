import { useState } from "react";
import "./Order.css";
import ChooseItems from "../components/ChooseItems.tsx";
// import ShoppingCartContext from "../context/ShoppingCartContext.tsx";

function Order() {
  const [stepNumber] = useState<number>(1);
  return (
    <>
      {/* <ShoppingCartContext.Provider value={{ id: 0, amount: 0 }}> */}
      <section className="ordersection">
        <div className="ordercontainer">
          <ChooseItems />
        </div>
        <div className="ordersteps">
          <h3>{stepNumber}</h3>
        </div>
      </section>
      {/* </ShoppingCartContext.Provider> */}
    </>
  );
}

export default Order;
