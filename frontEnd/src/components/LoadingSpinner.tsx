interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "white" | "gray";
  fullScreen?: boolean;
  message?: string;
}

const LoadingSpinner = ({
  size = "md",
  color = "primary",
  fullScreen = false,
  message,
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  const colorClasses = {
    primary: "border-cyan-600",
    white: "border-white",
    gray: "border-gray-600",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent ${sizeClasses[size]} ${colorClasses[color]}`}
        role="status"
        aria-label="Loading"
      />
      {message && (
        <p className="mt-4 text-sm text-gray-600">{message}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;