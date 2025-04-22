import { useParams } from "react-router-dom";
import { useAppSelector } from "@/utils/hooks";
import OrderProgress from "./OrderProgress";

const OrderSummary = () => {
  const { id } = useParams(); // Get order id from the URL
  const productId = id ? parseInt(id, 10) : null;
  const order = useAppSelector((state) => state.products.orders).find(
    (order) => order.id === productId,
  ); // Get the order by id
  console.log("Order Summary", order);
  return (
    <div className="mx-auto max-w-4xl space-y-6 rounded-xl bg-white p-6 shadow-md">
      <div>
        <h2 className="text-xl font-semibold">
          Order <span className="text-indigo-600">#{productId}</span>
        </h2>
        <p className="text-sm text-gray-500">Order placed {order.placed_at}</p>
        <a href="#" className="text-sm text-indigo-600 hover:underline">
          View Invoice
        </a>
      </div>

      {/* Product 1 */}
      {order.items.map((item) => (
        <div key={item.id} className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="https://picsum.photos/200/300"
                alt={item.product_name}
                className="h-16 w-16 rounded object-cover"
              />
              <div>
                <p className="font-medium">{item.product_name}</p>
                <p className="text-sm text-gray-500">${item.total_price}</p>
              </div>
            </div>
            <div className="text-right text-sm text-gray-600">
              <p>Delivery address</p>
              <p>Floyd Miles</p>
              <p>{order.shipping_address}</p>
              <p className="mt-1">Shipping updates: f•••@example.com</p>
            </div>
          </div>
          <div>
            {/* <p className="mb-1 text-sm text-gray-600">
              {item.status} on {order.placed_at}
            </p> */}
            <OrderProgress currentStep={item.status} />{" "}
            {/* Or "Shipped", etc. */}
          </div>
        </div>
      ))}

      {/* Payment and Summary */}
      <div className="space-y-2 border-t pt-4 text-sm text-gray-700">
        <div className="flex justify-between">
          <p>Billing address</p>
          <div className="text-right">
            <p>{order.shipping_address}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <p>Payment information</p>
          <div className="text-right">
            <p>Ending with 4242</p>
            <p>Expires 02/24</p>
          </div>
        </div>
        <div className="flex justify-between font-medium">
          <p>Subtotal</p>
          <p>${order.total_price}</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping</p>
          <p>$5.00</p>
        </div>
        <div className="flex justify-between">
          <p>Tax</p>
          <p>$6.16</p>
        </div>
        <div className="flex justify-between font-semibold">
          <p>Order total</p>
          <p>${order.total_price + 5 + 6.16}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
