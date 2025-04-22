import React from "react";

type Step = "Order placed" | "Processing" | "Shipped" | "Delivered";

const steps: Step[] = ["Order placed", "Processing", "Shipped", "Delivered"];

interface Props {
  currentStep: Step;
}

// OrderProgress component to show the progress of an order
// It takes the current status as a prop and displays the progress
const OrderProgress = ({ currentStep }: Props) => {
  const currentIndex = steps.indexOf(currentStep);
  const isDelivered = currentStep === "Delivered";

  const getDotClass = (idx: number) =>
    idx <= currentIndex
      ? isDelivered
        ? "bg-green-600"
        : "bg-indigo-600"
      : "bg-gray-300";

  const getTextClass = (idx: number) =>
    idx <= currentIndex
      ? isDelivered
        ? "text-green-600 font-medium"
        : "text-indigo-600 font-medium"
      : "text-gray-400";

  const getLineClass = (idx: number) =>
    idx < currentIndex
      ? isDelivered
        ? "bg-green-600"
        : "bg-indigo-600"
      : "bg-gray-300";

  return (
    <div className="mt-2 flex items-center justify-between space-x-2">
      {steps.map((step, idx) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center text-xs">
            <div className={`h-2.5 w-2.5 rounded-full ${getDotClass(idx)}`} />
            <span className={`mt-1 ${getTextClass(idx)}`}>{step}</span>
          </div>
          {idx < steps.length - 1 && (
            <div className={`h-0.5 flex-1 ${getLineClass(idx)}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default OrderProgress;
