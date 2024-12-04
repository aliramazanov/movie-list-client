import { PrimaryProps } from "../../definitions";

const Primary: React.FC<PrimaryProps> = ({ type = "button", onClick, children, disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`
      w-full 
      h-[54px] 
      bg-primary 
      text-white 
      rounded-[10px] 
      text-body-regular 
      font-medium 
      transition-colors 
      duration-200
      ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-90"}
    `}
  >
    {children}
  </button>
);

export default Primary;
