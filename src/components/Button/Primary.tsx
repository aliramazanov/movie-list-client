import { motion } from "motion/react";
import { PrimaryProps } from "../../definitions";

const Primary: React.FC<PrimaryProps> = ({ type = "button", onClick, children, disabled = false }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.2 }}
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
  </motion.button>
);

export default Primary;
