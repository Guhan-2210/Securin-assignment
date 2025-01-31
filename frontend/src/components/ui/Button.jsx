// src/components/ui/button.jsx
const Button = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  const baseStyle = "px-4 py-2 rounded-md";
  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-gray-300 hover:bg-gray-50",
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
