import { createContext } from "react";

export interface OrderDetailsInformation {
  takeaway: boolean;
  tableNumber: number | null;
}

interface OrderDetailsType {
  orderDetails: OrderDetailsInformation;
  setOrderDetails: (item: OrderDetailsInformation) => void;
}

const defaultOrderDetailsContext: OrderDetailsType = {
  orderDetails: { takeaway: false, tableNumber: null },
  setOrderDetails: () => {},
};

const OrderDetailsContext = createContext<OrderDetailsType>(
  defaultOrderDetailsContext
);

export default OrderDetailsContext;
