import { InputProps } from "../../definitions";

export const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  name,
  onBlur,
}) => (
  <div className="w-full">
    <input
      type={type}
      value={value}
      onChange={onChange}
      onBlur={() => onBlur?.(name)}
      placeholder={placeholder}
      name={name}
      className={`
        w-full 
        h-[54px] 
        bg-input 
        text-white 
        rounded-[10px] 
        px-[15px] 
        text-body-regular
        focus:outline-none
        ${error ? "border border-error" : ""}
        placeholder:text-gray-400
        placeholder:opacity-70
        placeholder:text-body-regular
      `}
      required={required}
    />
    {error && <p className="text-error text-body-small mt-1">{error}</p>}
  </div>
);
