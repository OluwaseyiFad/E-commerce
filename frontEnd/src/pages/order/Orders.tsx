import { Link } from "react-router-dom";
import { useGetOrdersByUserQuery } from "../../services/productApi";
import { setOrders } from "@/store/slices/productSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Orders: React.FC = () => {
  const { data: orders, isLoading, error } = useGetOrdersByUserQuery({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOrders(orders));
  }, [orders, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error("Error fetching order:", error);
    return <div>Error fetching order items</div>;
  }
  return (
    <div className="mx-auto mt-10 max-w-2xl p-4">
      <h2 className="mb-4 text-2xl font-semibold">Your Orders</h2>
      <ul className="divide-y divide-gray-200">
        {orders.map((order) => (
          <li key={order.id} className="flex items-center justify-between py-4">
            <div>
              <p className="text-lg font-medium">Order #{order.id}</p>
              <p className="text-sm text-gray-500">
                Placed on {order.placed_at}
              </p>
            </div>
            <Link
              to={`/orders/${order.id}`}
              className="text-sm text-indigo-600 hover:underline"
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
