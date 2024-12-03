import { useState } from "react";
import Primary from "../Button/Primary";
import { Checkbox } from "../Checkbox/Checkbox";
import { Input } from "../Input/Input";

interface SignInFormProps {
  onSubmit: (email: string, password: string, rememberMe: boolean) => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, rememberMe);
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
        />
      </div>
      <div>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
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
