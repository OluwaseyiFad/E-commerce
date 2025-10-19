import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import {
  useClearCartMutation,
  useCreateOrderMutation,
} from "@/services/productApi";
import { clearCart } from "@/store/slices/productSlice";
import { CartItemType, UserType, UserProfileType } from "@/utils/types";
import { sanitizeText } from "@/utils/sanitize";
import toast from "react-hot-toast";
import { getOperationError } from "@/utils/apiErrors";

interface CardDetails {
  cardNumber: string;
  expiry: string;
  cvv: string;
}

/**
 * Custom hook to manage checkout state and order placement logic
 */
export const useCheckout = () => {
  const [clearCartItems] = useClearCartMutation();
  const [createOrder] = useCreateOrderMutation();
  const user = useAppSelector((state) => state.auth.user) as UserType | null;
  const userProfile = useAppSelector(
    (state) => state.auth.userProfile,
  ) as UserProfileType | null;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Shipping address state
  const [shippingAddressOption, setShippingAddressOption] = useState("saved");
  const [newShippingAddressData, setNewShippingAddressData] = useState<Record<string, string>>({
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  // Billing address state
  const [billingAddressOption, setBillingAddressOption] = useState("saved");
  const [newBillingAddressData, setNewBillingAddressData] = useState<Record<string, string>>({
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // Event handlers for address changes
  const handleNewShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeText(value);
    setNewShippingAddressData((prev) => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleNewBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeText(value);
    setNewBillingAddressData((prev) => ({ ...prev, [name]: sanitizedValue }));
  };

  // Event handlers for payment changes
  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeText(value);
    setCardDetails((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  // Order placement logic
  const handlePlaceOrder = async (cart: any) => {
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
        // Clear the cart in the backend and update the Redux state
        await clearCartItems({});
        dispatch(clearCart());
        toast.success("Order placed successfully!");
        navigate("/orders");
      }
    } catch (error: any) {
      console.error("Order placement failed:", error);
      const errorMessage = getOperationError("place-order", error);
      toast.error(errorMessage);
    }
  };

  return {
    // Shipping address
    shippingAddressOption,
    setShippingAddressOption,
    newShippingAddressData,
    handleNewShippingChange,

    // Billing address
    billingAddressOption,
    setBillingAddressOption,
    newBillingAddressData,
    handleNewBillingChange,

    // Payment
    paymentMethod,
    handlePaymentMethodChange,
    cardDetails,
    handleCardDetailsChange,

    // Order placement
    handlePlaceOrder,

    // User data
    user,
    userProfile,
  };
};
