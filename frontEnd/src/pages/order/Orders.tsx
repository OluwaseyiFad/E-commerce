import { Link } from "react-router-dom";
import { useGetOrdersByUserQuery } from "../../services/productApi";
import { setOrders } from "@/store/slices/productSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { OrderType } from "@/utils/types";

const Orders: React.FC = () => {
  const { data: orders, isLoading, error } = useGetOrdersByUserQuery({});
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("orders", orders);
    dispatch(setOrders(orders));
  }, [orders, dispatch]);

  if (isLoading)
    return (
      <div className="rounded-md border border-gray-300 bg-gray-100 p-4 text-gray-700 shadow-sm">
        Loading...
      </div>
    );
  if (error) {
    console.error("Error fetching order:", error);
    return (
      <div className="rounded-md border border-red-300 bg-red-100 p-4 text-red-700 shadow-sm">
        <strong>No order found!</strong>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="rounded-md border border-red-300 bg-red-100 p-4 text-red-700 shadow-sm">
        <strong>No order found!</strong>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-2xl p-4">
      <h2 className="mb-4 text-2xl font-semibold">Your Orders</h2>
      <ul className="divide-y divide-gray-200">
        {orders.map((order: OrderType) => (
          <li key={order.id} className="flex items-center justify-between py-4">
            <div>
              <p className="text-lg font-medium">Order #{order.id}</p>
              <p className="text-sm text-gray-500">
                Placed on {order.placed_at}
              </p>
            </div>
            <Link
              to={`/orders/${order.id}`}
              className="text-sm text-cyan-600 hover:underline"
            >
              View Summary →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
