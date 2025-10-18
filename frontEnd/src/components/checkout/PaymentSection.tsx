interface CardDetails {
  cardNumber: string;
  expiry: string;
  cvv: string;
}

interface PaymentSectionProps {
  paymentMethod: string;
  onPaymentMethodChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cardDetails: CardDetails;
  onCardDetailsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * PaymentSection - Handles payment method selection and card details input
 *
 * NOTE: In a real application, I wouldn't handle credit card details directly.
 * I would use a payment provider like Stripe or PayPal.
 */
const PaymentSection: React.FC<PaymentSectionProps> = ({
  paymentMethod,
  onPaymentMethodChange,
  cardDetails,
  onCardDetailsChange,
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium">Payment Method</h3>

      {/* Payment Method Selection */}
      <div className="mt-2 space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === "card"}
            onChange={onPaymentMethodChange}
          />
          <span>Credit/Debit Card</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={onPaymentMethodChange}
          />
          <span>PayPal</span>
        </label>
      </div>

      {/* Card Details Form which is only shown when card is selected */}
      {paymentMethod === "card" && (
        <div className="mt-4 space-y-4">
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={cardDetails.cardNumber}
            onChange={onCardDetailsChange}
            className="w-full rounded-md border p-2"
          />
          <input
            type="text"
            name="expiry"
            placeholder="Expiry (MM/YY)"
            value={cardDetails.expiry}
            onChange={onCardDetailsChange}
            className="w-full rounded-md border p-2"
          />
          <input
            type="password"
            name="cvv"
            placeholder="CVV"
            value={cardDetails.cvv}
            onChange={onCardDetailsChange}
            className="w-full rounded-md border p-2"
          />
        </div>
      )}
    </div>
  );
};

export default PaymentSection;
