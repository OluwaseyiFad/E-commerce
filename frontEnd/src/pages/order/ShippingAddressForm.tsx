type Props = {
  shippingAddressOption: string;
  handleShippingAddressChange: (e: any) => void;
  newShippingAddressData: any;
  handleNewShippingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  user: any;
};

const ShippingAddressForm = ({
  shippingAddressOption,
  handleShippingAddressChange,
  newShippingAddressData,
  handleNewShippingChange,
  user,
}: Props) => {
  return (
    user && (
      <div>
        <h3 className="text-lg font-medium">Shipping Address</h3>
        <div className="mt-2 space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="shippingAddress"
              value="saved"
              checked={shippingAddressOption === "saved"}
              onChange={handleShippingAddressChange}
            />
            <span>Use saved shipping address</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="shippingAddress"
              value="new"
              checked={shippingAddressOption === "new"}
              onChange={handleShippingAddressChange}
            />
            <span>Enter new shipping address</span>
          </label>
        </div>

        {shippingAddressOption === "new" && (
          <div className="mt-4 space-y-3">
            {Object.entries(newShippingAddressData).map(([key, value]) => (
              <input
                key={key}
                type="text"
                name={key}
                value={value}
                onChange={handleNewShippingChange}
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

export default ShippingAddressForm;
