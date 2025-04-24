import React from "react";

type CartSummaryProps = {
  totalPrice: number;
};

const CartSummary: React.FC<CartSummaryProps> = ({ totalPrice }) => {
  const shipping = 5.0;
  const tax = 6.16;
  const orderTotal = totalPrice + shipping + tax;

  return (
    <>
      <h3 className="mb-4 text-xl font-semibold">Order Summary</h3>
      <div className="mb-2 flex justify-between text-lg font-medium text-gray-800">
        <span>Subtotal</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <div className="mb-2 flex justify-between text-lg font-medium text-gray-800">
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className="mb-2 flex justify-between text-lg font-medium text-gray-800">
        <span>Tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="mb-2 flex justify-between text-lg font-medium text-gray-800">
        <span>Order Total</span>
        <span>${orderTotal.toFixed(2)}</span>
      </div>
      <p className="text-sm text-gray-500">
        Shipping and taxes calculated at checkout.
      </p>
    </>
  );
};

export default CartSummary;
