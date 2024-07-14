import { FaSpinner } from "react-icons/fa";
import React from "react";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  iconColor?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = "medium",
  iconColor = "white",
}) => {
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    medium: "w-6 h-6 border-4",
    large: "w-8 h-8 border-6",
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
    </div>
  );
};

export default Loader;
