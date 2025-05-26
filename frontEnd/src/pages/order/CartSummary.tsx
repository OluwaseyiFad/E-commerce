import React from "react";
import { CartSummaryProps } from "@/utils/types";

const CartSummary: React.FC<CartSummaryProps> = ({ totalPrice }) => {
  const TAX_RATE = 0.0616; // 6.16%
  const STANDARD_SHIPPING = 5.0;
  const FREE_SHIPPING_THRESHOLD = 1000.0;

  // Calculate tax based on current US rate
  const tax = totalPrice * TAX_RATE;

  // Apply free shipping if total is over the threshold
  const shipping =
    totalPrice > FREE_SHIPPING_THRESHOLD || totalPrice == 0
      ? 0.0
      : STANDARD_SHIPPING;

  // Calculate order total
  const orderTotal = totalPrice + shipping + tax;

  return (
    <>
      <h3 className="mb-4 text-xl font-semibold">Order Summary</h3>

      {/* Subtotal */}
      <div className="mb-2 flex justify-between text-lg font-medium text-gray-800">
        <span>Subtotal</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      {/* Shipping */}
      <div className="mb-2 flex justify-between text-lg font-medium text-gray-800">
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>

      {/* Tax */}
      <div className="mb-2 flex justify-between text-lg font-medium text-gray-800">
        <span>Tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>

      {/* Order Total */}
      <div className="mb-2 flex justify-between text-lg font-medium text-gray-800">
        <span>Order Total</span>
        <span>${orderTotal.toFixed(2)}</span>
      </div>

      {/* Notice for free shipping */}
      {totalPrice > FREE_SHIPPING_THRESHOLD && (
        <p className="text-sm text-green-600">
          Shipping fee excluded as order total exceeds $1000.
        </p>
      )}

      {/* Notice for empty cart */}
      {totalPrice === 0 && (
        <p className="text-sm text-gray-500">Your cart is empty.</p>
      )}
    </>
  );
};

export default CartSummary;
