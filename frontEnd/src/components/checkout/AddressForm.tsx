import { UserType } from "@/utils/types";

interface AddressFormProps {
  addressType: "shipping" | "billing";
  addressOption: string;
  onOptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newAddressData: Record<string, string>;
  onAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  user: UserType;
}

/**
 * AddressForm Component - Reusable form for shipping/billing addresses
 *
 * Features:
 * - Toggle between saved and new address
 * - Dynamic field generation from address data
 * - Proper capitalization of field labels
 * - Consistent styling across address types
 */
const AddressForm: React.FC<AddressFormProps> = ({
  addressType,
  addressOption,
  onOptionChange,
  newAddressData,
  onAddressChange,
  user,
}) => {
  // Capitalize first letter for display
  const addressTypeCapitalized =
    addressType.charAt(0).toUpperCase() + addressType.slice(1);

  // Radio name should be unique per address type
  const radioName = `${addressType}Address`;

  return (
    user && (
      <div className="mb-6">
        <h3 className="text-lg font-medium">{addressTypeCapitalized} Address</h3>
        <div className="mt-2 space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name={radioName}
              value="saved"
              checked={addressOption === "saved"}
              onChange={onOptionChange}
              className="h-4 w-4 border-gray-300 text-cyan-600 focus:ring-cyan-500"
            />
            <span>Use saved {addressType} address</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name={radioName}
              value="new"
              checked={addressOption === "new"}
              onChange={onOptionChange}
              className="h-4 w-4 border-gray-300 text-cyan-600 focus:ring-cyan-500"
            />
            <span>Enter new {addressType} address</span>
          </label>
        </div>

        {/* Render new address fields if selected */}
        {addressOption === "new" && (
          <div className="mt-4 space-y-3">
            {Object.entries(newAddressData).map(([key, value]) => (
              <input
                key={key}
                type="text"
                name={key}
                value={value as string}
                onChange={onAddressChange}
                placeholder={
                  key
                    .replace(/([A-Z])/g, " $1") // Add space before capital letters
                    .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
                }
                className="w-full rounded border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                aria-label={`${addressTypeCapitalized} ${key
                  .replace(/([A-Z])/g, " $1")
                  .toLowerCase()}`}
              />
            ))}
          </div>
        )}
      </div>
    )
  );
};

export default AddressForm;