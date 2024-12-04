import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { WaveDecoration } from "../components/Additional/WaveDecoration";
import Primary from "../components/Button/Primary";
import { Input } from "../components/Input/Input";
import { FormErrors } from "../definitions";
import { moviesApi } from "../services/movies";
import { useAuthStore } from "../store/authStore";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAuthStore((state) => state.token);

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentPoster, setCurrentPoster] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchMovie = async () => {
      if (!token || !id) return;

      try {
        const movie = await moviesApi.getMovie(token, id);
        setTitle(movie.title);
        setYear(movie.year.toString());
        setCurrentPoster(movie.poster || "");
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          general: `Failed to fetch movie details ${error}`,
        }));
        navigate(-1);
      }
    };

    fetchMovie();
  }, [token, id, navigate]);

  const validateField = (name: string, value: string): string | undefined => {
    if (!value && touchedFields.has(name)) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    if (name === "year" && value) {
      const yearNum = parseInt(value);
      const currentYear = new Date().getFullYear();
      if (isNaN(yearNum) || yearNum < 1888 || yearNum > currentYear) {
        return `Year must be between 1888 and ${currentYear}`;
      }
    }
    return undefined;
  };

  const handleBlur = (fieldName: string): void => {
    const newTouchedFields = new Set(touchedFields);
    newTouchedFields.add(fieldName);
    setTouchedFields(newTouchedFields);

    const value = fieldName === "title" ? title : year;
    const error = validateField(fieldName, value);

    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
    },
    maxSize: 5 * 1024 * 1024,
    maxFiles: 1,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        setErrors((prev) => ({
          ...prev,
          poster: "Please upload an image file (JPEG, PNG, or GIF) under 5MB",
        }));
        return;
      }
      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0]);
        setErrors((prev) => ({ ...prev, poster: undefined }));
      }
    },
  });

  const validateForm = (): boolean => {
    const allFields = new Set(["title", "year"]);
    setTouchedFields(allFields);

    const newErrors: FormErrors = {
      title: validateField("title", title),
      year: validateField("year", year),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async () => {
    if (!validateForm() || !token || !id) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("year", year);
      if (selectedFile) {
        formData.append("poster", selectedFile);
      }

      await moviesApi.updateMovie(token, id, formData);
      navigate(location.state?.from || "/my-movies", {
        state: { page: location.state?.page },
      });
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: `Failed to update movie. Please try again. ${(error as Error).message}`,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(location.state?.from || "/my-movies", {
      state: { page: location.state?.page },
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative px-4 md:px-8 lg:px-12">
      <div className="w-full max-w-[480px] md:max-w-[920px] mx-auto">
        <h1 className="text-white text-heading-3 md:text-heading-2 font-semibold text-center mb-12">
          Edit movie
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-[400px]">
            <div
              {...getRootProps()}
              className={`
                aspect-square
                border-2 border-dashed rounded-lg
                flex flex-col items-center justify-center
                cursor-pointer
                transition-colors
                ${isDragActive ? "border-primary bg-input/50" : "border-input bg-input/30"}
                ${errors.poster ? "border-error" : ""}
              `}
            >
              <input {...getInputProps()} />
              {selectedFile || currentPoster ? (
                <div className="w-full h-full p-2">
                  <img
                    src={selectedFile ? URL.createObjectURL(selectedFile) : currentPoster}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center text-white/70">
                  <ArrowDown className="w-8 h-8 mb-2" />
                  <p className="text-body-regular text-center">
                    {isDragActive ? "Drop image here" : "Drop an image here"}
                  </p>
                </div>
              )}
            </div>
            {errors.poster && <p className="text-error text-body-small mt-1">{errors.poster}</p>}
          </div>

          <div className="flex-1 space-y-6">
            {errors.general && (
              <div className="text-error text-body-small text-center mb-4">{errors.general}</div>
            )}

            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => handleBlur("title")}
              placeholder="Title"
              error={errors.title}
              name="title"
            />

            <div className="lg:w-3/5 md:w-3/5 sm:w-full">
              <Input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value.replace(/\D/g, ""))}
                onBlur={() => handleBlur("year")}
                placeholder="Publishing year"
                error={errors.year}
                name="year"
              />
            </div>

            <div className="flex gap-4 pt-8">
              <button
                onClick={handleCancel}
                className="flex-1 h-[54px] border border-white/20 text-white rounded-[10px] text-body-regular font-medium hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <div className="flex-1">
                <Primary onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update"}
                </Primary>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WaveDecoration />
    </div>
  );
};

export default Edit;
