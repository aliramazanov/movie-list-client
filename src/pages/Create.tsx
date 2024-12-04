import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Primary from "../components/Button/Primary";
import { ImageDropzone } from "../components/DropZone/ImageDropZone";
import { Input } from "../components/Input/Input";
import { PageWrapper } from "../components/Wrapper/PageWrapper";
import { FormErrors } from "../definitions";
import { useCreateMovie } from "../hooks/mutations/useMovieMutations";

const Create = () => {
  const navigate = useNavigate();
  const { mutate: createMovie, isPending } = useCreateMovie();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

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

  const handleDrop = (acceptedFiles: File[], rejectedFiles: unknown[]) => {
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
  };

  const validateForm = (): boolean => {
    const allFields = new Set(["title", "year"]);
    setTouchedFields(allFields);

    const newErrors: FormErrors = {
      title: validateField("title", title),
      year: validateField("year", year),
    };

    if (!selectedFile) {
      newErrors.poster = "Please upload a movie poster";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).filter((key) => !!newErrors[key as keyof FormErrors]).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("year", year);
    if (selectedFile) {
      formData.append("poster", selectedFile);
    }

    createMovie(formData, {
      onSuccess: () => {
        navigate("/my-movies");
      },
      onError: (error) => {
        setErrors((prev) => ({
          ...prev,
          general: error instanceof Error ? error.message : "Failed to create movie",
        }));
      },
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <PageWrapper className="items-center justify-center px-4 md:px-8 lg:px-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-[480px] md:max-w-[920px] mx-auto"
      >
        <motion.h1
          variants={itemVariants}
          className="text-white text-heading-3 md:text-heading-2 font-semibold text-center mb-12"
        >
          Create a new movie
        </motion.h1>

        <div className="flex flex-col md:flex-row gap-8">
          <ImageDropzone
            selectedFile={selectedFile}
            error={errors.poster}
            onDrop={handleDrop}
            className="w-full md:w-[400px]"
          />

          <motion.div variants={itemVariants} className="flex-1 space-y-6">
            {errors.general && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-error text-body-small text-center mb-4"
              >
                {errors.general}
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => handleBlur("title")}
                placeholder="Title"
                error={errors.title}
                name="title"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="lg:w-3/5 md:w-3/5 sm:w-full">
              <Input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value.replace(/\D/g, ""))}
                onBlur={() => handleBlur("year")}
                placeholder="Publishing year"
                error={errors.year}
                name="year"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="flex gap-4 pt-8">
              <motion.button
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                onClick={handleCancel}
                className="flex-1 h-[54px] border border-white/20 text-white rounded-[10px] text-body-regular font-medium hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Cancel
              </motion.button>
              <div className="flex-1">
                <Primary onClick={handleSubmit} disabled={isPending}>
                  {isPending ? "Creating..." : "Submit"}
                </Primary>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </PageWrapper>
  );
};

export default Create;
