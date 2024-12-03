interface InputProps {
  type: "email" | "password" | "text";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({ type, value, onChange, placeholder, required = false }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full h-[54px] bg-input text-white rounded-[10px] px-[15px] placeholder-gray-400 focus:outline-none text-body-regular"
    required={required}
  />
);
