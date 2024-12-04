import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError, loginApi } from "../../services/api";
import { moviesApi } from "../../services/movies";
import { useAuthStore } from "../../store/authStore";
import { storageUtils } from "../../utils/localStorage";
import Primary from "../Button/Primary";
import { Checkbox } from "../Checkbox/Checkbox";
import { Input } from "../Input/Input";

interface FormErrors {
  username?: string;
  password?: string;
  general?: string;
}

export const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const rememberedCredentials = storageUtils.getRememberMe();
    if (rememberedCredentials) {
      setUsername(rememberedCredentials.username);
      setPassword(rememberedCredentials.password);
      setRememberMe(true);
    }
  }, []);

  const validateField = (name: string, value: string): string | undefined => {
    if (!value && touchedFields.has(name)) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    return undefined;
  };

  const handleBlur = (fieldName: string): void => {
    const newTouchedFields = new Set(touchedFields);
    newTouchedFields.add(fieldName);
    setTouchedFields(newTouchedFields);

    const value = fieldName === "username" ? username : password;
    const error = validateField(fieldName, value);

    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const allFields = new Set(["username", "password"]);
    setTouchedFields(allFields);

    const newErrors: FormErrors = {
      username: validateField("username", username),
      password: validateField("password", password),
    };

    setErrors(newErrors);

    if (!newErrors.username && !newErrors.password) {
      try {
        const loginResponse = await loginApi(username, password);

        if (rememberMe) {
          storageUtils.setRememberMe(username, password);
        } else {
          storageUtils.clearRememberMe();
        }

        login(loginResponse.token, loginResponse.user);

        try {
          const moviesData = await moviesApi.getMovies(loginResponse.token);

          if (moviesData.totalMovies === 0) {
            navigate("/empty");
          } else {
            navigate("/my-movies");
          }
        } catch (error) {
          console.error("Failed to fetch movies:", error);
          navigate("/empty");
        }
      } catch (error) {
        const apiError = error as ApiError;
        setErrors((prev) => ({
          ...prev,
          general: apiError.message,
        }));
      }
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 w-full">
      {errors.general && <div className="text-error text-body-small text-center">{errors.general}</div>}
      <div>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          error={errors.username}
          name="username"
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
      <Primary type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </Primary>
    </form>
  );
};
