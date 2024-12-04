import { CheckboxProps } from "../../definitions";

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => (
  <label className="flex items-center cursor-pointer">
    <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
    <div
      className={`w-4 h-4 mr-2 border rounded ${
        checked ? "bg-primary border-primary" : "border-input bg-transparent"
      }`}
    >
      {checked && (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
        </svg>
      )}
    </div>
    <span className="text-white text-body-small">{label}</span>
  </label>
);
