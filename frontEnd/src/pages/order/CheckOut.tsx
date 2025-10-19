import { useGetCartItemsByUserQuery } from "@/services/productApi";
import { useCheckout } from "@/hooks/useCheckout";
import ShippingAddressForm from "./ShippingAddressForm";
import BillingAddressForm from "./BillingAddressForm";
import PaymentSection from "@/components/checkout/PaymentSection";
import CartSummary from "./CartSummary";
import LoadingSpinner from "@/components/LoadingSpinner";

const CheckOut = () => {
  const { data: cart, isLoading, error } = useGetCartItemsByUserQuery({});

  const {
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
  } = useCheckout();

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner size="lg" message="Loading checkout..." />
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

          <PaymentSection
            paymentMethod={paymentMethod}
            onPaymentMethodChange={handlePaymentMethodChange}
            cardDetails={cardDetails}
            onCardDetailsChange={handleCardDetailsChange}
          />

          <button
            onClick={() => handlePlaceOrder(cart)}
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
