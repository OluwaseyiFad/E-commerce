type Props = {
  billingAddressOption: string;
  handleBillingAddressChange: (e: any) => void;
  newBillingAddressData: any;
  handleNewBillingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  user: any;
};

const BillingAddressForm = ({
  billingAddressOption,
  handleBillingAddressChange,
  newBillingAddressData,
  handleNewBillingChange,
  user,
}: Props) => {
  return (
    user && (
      <div>
        <h3 className="text-lg font-medium">Billing Address</h3>
        <div className="mt-2 space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="billingAddress"
              value="saved"
              checked={billingAddressOption === "saved"}
              onChange={handleBillingAddressChange}
            />
            <span>Use saved billing address</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="billingAddress"
              value="new"
              checked={billingAddressOption === "new"}
              onChange={handleBillingAddressChange}
            />
            <span>Enter new billing address</span>
          </label>
        </div>

        {billingAddressOption === "new" && (
          <div className="mt-4 space-y-3">
            {Object.entries(newBillingAddressData).map(([key, value]) => (
              <input
                key={key}
                type="text"
                name={key}
                value={value as string}
                onChange={handleNewBillingChange}
                placeholder={key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                className="w-full rounded border px-3 py-2"
              />
            ))}
          </div>
        )}
      </div>
    )
  );
};

export default BillingAddressForm;
