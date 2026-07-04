function Input({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  accept,
  min,
  max,
  step,
}) {
  return (
    <input
      type={type}
      name={name}
      value={type === "file" ? undefined : value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      accept={accept}
      min={min}
      max={max}
      step={step}
      className={`w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
        disabled ? "cursor-not-allowed bg-gray-100 text-gray-500" : ""
      }`}
    />
  );
}

export default Input;