import { useState } from "react";
import Primary from "../Button/Primary";
import { Checkbox } from "../Checkbox/Checkbox";
import { Input } from "../Input/Input";

interface FormErrors {
  email?: string;
  password?: string;
}

interface SignInFormProps {
  onSubmit: (email: string, password: string, rememberMe: boolean) => void;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const validateField = (name: string, value: string) => {
    if (!value && touchedFields.has(name)) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    if (name === "email" && value && touchedFields.has(name)) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email";
      }
    }

    return undefined;
  };

  const handleBlur = (fieldName: string) => {
    const newTouchedFields = new Set(touchedFields);
    newTouchedFields.add(fieldName);
    setTouchedFields(newTouchedFields);

    const value = fieldName === "email" ? email : password;
    const error = validateField(fieldName, value);

    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const allFields = new Set(["email", "password"]);
    setTouchedFields(allFields);

    const newErrors: FormErrors = {
      email: validateField("email", email),
      password: validateField("password", password),
    };

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      onSubmit(email, password, rememberMe);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 w-full">
      <div>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          error={errors.email}
          name="email"
          onBlur={handleBlur}
        />
      </div>
      <div>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          error={errors.password}
          name="password"
          onBlur={handleBlur}
        />
      </div>
      <div className="flex justify-center items-center">
        <Checkbox
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          label="Remember me"
        />
      </div>
      <Primary type="submit">Login</Primary>
    </form>
  );
};
