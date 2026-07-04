function TextArea({
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
}) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      rows="4"
      className={`w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
        disabled ? "cursor-not-allowed bg-gray-100 text-gray-500" : ""
      }`}
    />
  );
}

export default TextArea;