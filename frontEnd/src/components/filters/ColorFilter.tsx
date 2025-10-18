import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";

interface ColorFilterProps {
  selectedColors: string[];
  colorOptions: string[];
  onColorChange: (color: string) => void;
}

/**
 * ColorFilter - Collapsible color filter with checkboxes
 */
const ColorFilter: React.FC<ColorFilterProps> = ({
  selectedColors,
  colorOptions,
  onColorChange,
}) => {
  return (
    <Disclosure as="div" className="border-b border-gray-200 py-6">
      <h3 className="-my-3 flow-root">
        <DisclosureButton className="group flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
          <span className="font-medium text-gray-900">Color</span>
          <span className="ml-6 flex items-center">
            <PlusIcon className="size-5 group-data-open:hidden" />
            <MinusIcon className="size-5 group-not-data-open:hidden" />
          </span>
        </DisclosureButton>
      </h3>
      <DisclosurePanel className="pt-6">
        <div className="space-y-4">
          {colorOptions.map((color) => (
            <div key={color} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onChange={() => onColorChange(color)}
                className="h-4 w-4 rounded border-gray-300 text-cyan-600"
              />
              <label htmlFor={`color-${color}`} className="text-sm text-gray-600">
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default ColorFilter;
