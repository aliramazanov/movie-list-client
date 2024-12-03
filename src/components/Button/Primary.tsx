interface PrimaryProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
}

const Primary: React.FC<PrimaryProps> = ({ type = "button", onClick, children }) => (
  <button
    type={type}
    onClick={onClick}
    className="w-full h-[54px] bg-primary text-white rounded-[10px] text-body-regular font-medium hover:bg-opacity-90 transition-colors duration-200"
  >
    {children}
  </button>
);

export default Primary;
