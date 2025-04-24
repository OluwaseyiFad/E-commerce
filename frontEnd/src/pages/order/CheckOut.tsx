import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import {
  useClearCartMutation,
  useCreateOrderMutation,
} from "@/services/productApi";
import { clearCart } from "@/store/slices/productSlice";
import ShippingAddressForm from "./ShippingAddressForm";
import BillingAddressForm from "./BillingAddressForm";
import CartSummary from "./CartSummary";

const CheckOut = () => {
  const [clearCartItems] = useClearCartMutation();
  const [createOrder] = useCreateOrderMutation();
  const cart = useAppSelector((state) => state.products.cart);
  const user = useAppSelector((state) => state.auth.user);
  const userProfile = useAppSelector((state) => state.auth.userProfile);
  const dispatch = useAppDispatch();
  const [shippingAddressOption, setShippingAddressOption] = useState("saved");
  const [billingAddressOption, setBillingAddressOption] = useState("saved");
  const [newShippingAddressData, setNewShippingAddressData] = useState({
    fullName: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [newBillingAddressData, setNewBillingAddressData] = useState({
    fullName: "",
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

  const handleBillingAddressChange = (e: any) =>
    setBillingAddressOption(e.target.value);
  const handleShippingAddressChange = (e: any) =>
    setShippingAddressOption(e.target.value);
  const handleNewShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewShippingAddressData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBillingAddressData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: any) => setPaymentMethod(e.target.value);
  const handleCardDetailsChange = (e: any) => {
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
          ? userProfile.shippingAddress
          : `${newShippingAddressData.fullName}, ${newShippingAddressData.addressLine1}, ${newShippingAddressData.city}, ${newShippingAddressData.state}, ${newShippingAddressData.postalCode}, ${newShippingAddressData.country}`;

      const billingAddressStr =
        billingAddressOption === "saved"
          ? userProfile.billingAddress
          : `${newBillingAddressData.fullName}, ${newBillingAddressData.addressLine1}, ${newBillingAddressData.city}, ${newBillingAddressData.state}, ${newBillingAddressData.postalCode}, ${newBillingAddressData.country}`;

      // Create the order payload
      const orderPayload = {
        user: user.id,
        items: cart.items.map((item) => ({
          product: item.product_id,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        })),
        payment_method: paymentMethod,
        shipping_address: shippingAddressStr,
        billing_address: billingAddressStr,
        card_details: cardDetails,
      };

      const response = await createOrder(orderPayload).unwrap();

      // Check if the order was created successfully
      // If yes, clear the cart and reset Redux state
      if (response?.id) {
        await clearCartItems({});
        dispatch(clearCart());
        alert("Order placed successfully!");
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  if (!cart) return <div className="p-6 text-red-500">Error loading cart.</div>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Checkout Form */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-6 text-2xl font-semibold">Checkout</h2>

          <form className="space-y-6">
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-medium">Contact Information</h3>
              <input
                type="email"
                placeholder="Email"
                className="mt-2 w-full rounded-md border p-2"
              />
            </div>

            <ShippingAddressForm
              shippingAddressOption={shippingAddressOption}
              handleShippingAddressChange={handleShippingAddressChange}
              newShippingAddressData={newShippingAddressData}
              handleNewShippingChange={handleNewShippingChange}
              user={user}
            />

            <BillingAddressForm
              billingAddressOption={billingAddressOption}
              handleBillingAddressChange={handleBillingAddressChange}
              newBillingAddressData={newBillingAddressData}
              handleNewBillingChange={handleNewBillingChange}
              user={user}
            />

            {/* Delivery Method */}
            <div>
              <h3 className="text-lg font-medium">Delivery Method</h3>
              <div className="mt-2 space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="delivery"
                    value="standard"
                    defaultChecked
                  />
                  <span>Standard - $5.00</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="delivery" value="express" />
                  <span>Express - $10.00</span>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-medium">Payment Method</h3>
              <div className="mt-2 space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    defaultChecked
                  />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="payment" value="paypal" />
                  <span>PayPal</span>
                </label>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full rounded-md bg-cyan-600 py-2 font-medium text-white hover:bg-cyan-700"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Cart Summary */}
        <div className="h-fit rounded-lg bg-white p-6 shadow">
          <CartSummary totalPrice={cart?.total_price || 0} />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
