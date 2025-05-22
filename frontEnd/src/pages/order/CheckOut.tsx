import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import {
  useClearCartMutation,
  useCreateOrderMutation,
} from "@/services/productApi";
import { clearCart } from "@/store/slices/productSlice";
import ShippingAddressForm from "./ShippingAddressForm";
import BillingAddressForm from "./BillingAddressForm";
import CartSummary from "./CartSummary";
import {
  CartItemType,
  CartType,
  UserType,
  UserProfileType,
} from "@/utils/types";

const CheckOut = () => {
  const [clearCartItems] = useClearCartMutation();
  const [createOrder] = useCreateOrderMutation();
  const cart = useAppSelector((state) => state.products.cart) as CartType | [];
  const user = useAppSelector((state) => state.auth.user) as UserType | null;
  const userProfile = useAppSelector((state) => state.auth.userProfile)?.[0] as
    | UserProfileType
    | undefined;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [shippingAddressOption, setShippingAddressOption] = useState("saved");
  const [billingAddressOption, setBillingAddressOption] = useState("saved");
  const [newShippingAddressData, setNewShippingAddressData] = useState({
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [newBillingAddressData, setNewBillingAddressData] = useState({
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleNewShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewShippingAddressData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBillingAddressData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPaymentMethod(e.target.value);

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    try {
      const shippingAddressStr =
        shippingAddressOption === "saved"
          ? userProfile?.shipping_address
          : `${newShippingAddressData.addressLine1}, ${newShippingAddressData.city}, ${newShippingAddressData.state}, ${newShippingAddressData.postalCode}, ${newShippingAddressData.country}`;

      const billingAddressStr =
        billingAddressOption === "saved"
          ? userProfile?.billing_address
          : `${newBillingAddressData.addressLine1}, ${newBillingAddressData.city}, ${newBillingAddressData.state}, ${newBillingAddressData.postalCode}, ${newBillingAddressData.country}`;

      const orderPayload = {
        user: user?.id,
        items: Array.isArray(cart)
          ? []
          : cart.items.map((item: CartItemType) => ({
              product: item.product_id,
              quantity: item.quantity,
              color: item.color,
              size: item.size,
            })),
        payment_method: paymentMethod,
        shipping_address: shippingAddressStr,
        billing_address: billingAddressStr,
        card: cardDetails,
      };
      console.log("Order Payload:", orderPayload);
      const response = await createOrder(orderPayload).unwrap();

      if (response?.id) {
        // Clear the cart in the backend
        // and update the Redux state and local storage
        await clearCartItems({});
        dispatch(clearCart());
        alert("Order placed successfully!");
        navigate("/orders");
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-6 text-2xl font-semibold">Checkout</h2>

          <ShippingAddressForm
            shippingAddressOption={shippingAddressOption}
            handleShippingAddressChange={(e) =>
              setShippingAddressOption(e.target.value)
            }
            newShippingAddressData={newShippingAddressData}
            handleNewShippingChange={handleNewShippingChange}
            user={user}
          />

          <BillingAddressForm
            billingAddressOption={billingAddressOption}
            handleBillingAddressChange={(e) =>
              setBillingAddressOption(e.target.value)
            }
            newBillingAddressData={newBillingAddressData}
            handleNewBillingChange={handleNewBillingChange}
            user={user}
          />

          <div>
            <h3 className="text-lg font-medium">Payment Method</h3>
            <div className="mt-2 space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={handlePaymentChange}
                />
                <span>Credit/Debit Card</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={handlePaymentChange}
                />
                <span>PayPal</span>
              </label>
            </div>

            {paymentMethod === "card" && (
              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={cardDetails.cardNumber}
                  onChange={handleCardDetailsChange}
                  className="w-full rounded-md border p-2"
                />
                <input
                  type="text"
                  name="expiry"
                  placeholder="Expiry (MM/YY)"
                  value={cardDetails.expiry}
                  onChange={handleCardDetailsChange}
                  className="w-full rounded-md border p-2"
                />
                <input
                  type="password"
                  name="cvv"
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailsChange}
                  className="w-full rounded-md border p-2"
                />
              </div>
            )}
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full rounded-md bg-cyan-600 py-2 font-medium text-white hover:bg-cyan-700"
          >
            Place Order
          </button>
        </div>

        <div className="h-fit rounded-lg bg-white p-6 shadow">
          <CartSummary
            totalPrice={cart && "total_price" in cart ? cart.total_price : 0}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
