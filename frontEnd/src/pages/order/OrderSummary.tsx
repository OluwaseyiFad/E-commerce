import { useParams } from "react-router-dom";
import { useAppSelector } from "@/utils/hooks";
import OrderProgress from "./OrderProgress";
import { CartItemType, OrderSummaryType, UserType } from "@/utils/types";

const OrderSummary = () => {
  const { id } = useParams(); // Get order id from the URL
  const productId = id ? parseInt(id, 10) : null;
  const orders = useAppSelector(
    (state) => state.products.orders,
  ) as OrderSummaryType[];
  const order = orders.find((order) => order.id === productId); // Get the order by id
  const user = useAppSelector((state) => state.auth.user) as UserType | null;

  // If no order is found, display a message
  if (!order) {
    return (
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 text-center shadow-md">
        <h2 className="text-xl font-semibold text-red-600">Order not found</h2>
        <p className="text-gray-500">
          We couldn't find the order with ID #{productId}.
        </p>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-4xl space-y-6 rounded-xl bg-white p-6 shadow-md">
      <div>
        <h2 className="text-xl font-semibold">
          Order <span className="text-cyan-600">#{productId}</span>
        </h2>
        <p className="text-sm text-gray-500">Order placed {order.placed_at}</p>
      </div>

      {/* Order items */}
      {order.items.map((item: CartItemType) => (
        <div key={item.id} className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={
                  item.product_image ||
                  "https://placehold.co/200x300?text=No+Image"
                }
                alt={item.product_name}
                className="h-16 w-16 rounded object-cover"
              />
              <div>
                <p className="font-medium">{item.product_name}</p>
                <p className="text-sm text-gray-500">${item.total_price}</p>
              </div>
            </div>
          </div>
          <div>
            <OrderProgress currentStep={order.status} />{" "}
          </div>
        </div>
      ))}

      {/* Payment and Summary */}
      <div className="space-y-2 border-t pt-4 text-sm text-gray-700">
        <div className="flex justify-between">
          <p>Billing address</p>
          <div className="text-right">
            <p>{order.billing_address}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <p>Shipping address</p>
          <div className="text-right">
            <p>{order.shipping_address}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <p>Shipping updates</p>
          <div className="text-right">
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <p>Payment information</p>
          {order.payment_method === "card" && (
            <div className="text-right">
              <p>Card </p>
              <p>Ending with {order.card?.card_number?.slice(-4) ?? "N/A"}</p>
              <p>Expires {order.card?.expiry ?? "N/A"}</p>
            </div>
          )}
          {order.payment_method === "paypal" && (
            <div className="text-right">
              <p>PayPal</p>
            </div>
          )}
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
          <p>${(order.total_price + 5 + 6.16).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
