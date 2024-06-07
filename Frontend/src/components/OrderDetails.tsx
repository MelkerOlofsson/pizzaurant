import { useContext } from "react";
import "./OrderDetails.css";
import OrderDetailsContext from "../context/OrderDetailsContext";

function OrderDetails() {
  const { orderDetails, setOrderDetails } = useContext(OrderDetailsContext);

  function handleTakeawayChange(e: React.ChangeEvent<HTMLInputElement>) {
    const takeawayChecked = e.target.checked;
    setOrderDetails({ takeaway: takeawayChecked, tableNumber: null });
  }

  function handleTableNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    let tableChange: number | null = parseInt(e.target.value);
    if (isNaN(tableChange)) {
      tableChange = null;
    }
    setOrderDetails({ takeaway: false, tableNumber: tableChange });
  }

  return (
    <>
      <h1>Will you eat at the Pizzaurant or at home?</h1>
      <form className="orderdetails">
        <label htmlFor="takeawaytype">Takeaway?</label>
        <input
          type="checkbox"
          name="ordertype"
          id="takeawaytype"
          checked={orderDetails.takeaway}
          onChange={handleTakeawayChange}
        />

        <label htmlFor="tablenumber">Tablenumber:</label>
        <input
          type="number"
          id="tablenumber"
          placeholder="Choose your table"
          value={
            orderDetails.tableNumber !== null ? orderDetails.tableNumber : ""
          }
          onChange={handleTableNumberChange}
          disabled={orderDetails.takeaway}
        />
      </form>
    </>
  );
}

export default OrderDetails;
