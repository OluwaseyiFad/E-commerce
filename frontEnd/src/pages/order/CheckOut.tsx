import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import {
  useClearCartMutation,
  useCreateOrderMutation,
  useGetCartItemsByUserQuery,
} from "@/services/productApi";
import { clearCart } from "@/store/slices/productSlice";
import ShippingAddressForm from "./ShippingAddressForm";
import BillingAddressForm from "./BillingAddressForm";
import CartSummary from "./CartSummary";
import { CartItemType, UserType, UserProfileType } from "@/utils/types";

const CheckOut = () => {
  const [clearCartItems] = useClearCartMutation();
  const [createOrder] = useCreateOrderMutation();
  const { data: cart, isLoading, error } = useGetCartItemsByUserQuery({});
  const user = useAppSelector((state) => state.auth.user) as UserType | null;
  const userProfile = useAppSelector(
    (state) => state.auth.userProfile,
  ) as UserProfileType | null;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // State for shipping and billing address options
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
  // State for payment method and card details
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // Handlers for shipping and billing address changes
  const handleNewShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewShippingAddressData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBillingAddressData((prev) => ({ ...prev, [name]: value }));
  };

  // Handlers for payment details changes
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPaymentMethod(e.target.value);

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Function to handle order placement
  const handlePlaceOrder = async () => {
    // Validate required fields
    try {
      // Use saved addresses if selected or new addresses if provided
      const shippingAddressStr =
        shippingAddressOption === "saved"
          ? userProfile?.shipping_address
          : `${newShippingAddressData.addressLine1}, ${newShippingAddressData.city}, ${newShippingAddressData.state}, ${newShippingAddressData.postalCode}, ${newShippingAddressData.country}`;

      const billingAddressStr =
        billingAddressOption === "saved"
          ? userProfile?.billing_address
          : `${newBillingAddressData.addressLine1}, ${newBillingAddressData.city}, ${newBillingAddressData.state}, ${newBillingAddressData.postalCode}, ${newBillingAddressData.country}`;

      // Set up the order payload
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

  if (isLoading)
    return (
      <div className="rounded-md border border-gray-300 bg-gray-100 p-4 text-gray-700 shadow-sm">
        Loading...
      </div>
    );
  if (error) {
    return (
      <div className="rounded-md border border-red-300 bg-red-100 p-4 text-red-700 shadow-sm">
        <strong>No cart found!</strong>
      </div>
    );
  }

  if (!user || !userProfile) {
    return (
      <div className="rounded-md border border-yellow-300 bg-yellow-100 p-4 text-yellow-700 shadow-sm">
        <strong>Please log in to proceed with checkout.</strong>
      </div>
    );
  }

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
