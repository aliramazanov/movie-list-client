import { ArrowDown } from "lucide-react";
import { motion } from "motion/react";
import { useDropzone } from "react-dropzone";
import { ImageDropzoneProps } from "../../definitions";

export const ImageDropzone = ({
  selectedFile,
  error,
  onDrop,
  currentPoster,
  className = "",
}: ImageDropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
    },
    maxSize: 5 * 1024 * 1024,
    maxFiles: 1,
    onDrop,
  });

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={`
          aspect-square
          border-2 border-dashed rounded-lg
          flex flex-col items-center justify-center
          cursor-pointer
          transition-all
          hover:scale-[1.02]
          active:scale-[0.98]
          ${isDragActive ? "border-primary bg-input/50" : "border-input bg-input/30"}
          ${error ? "border-error" : ""}
        `}
      >
        <input {...getInputProps()} />
        {selectedFile || currentPoster ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full p-2">
            <img
              src={selectedFile ? URL.createObjectURL(selectedFile) : currentPoster}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          </motion.div>
        ) : (
          <motion.div
            animate={{ y: isDragActive ? -10 : 0 }}
            className="flex flex-col items-center text-white/70"
          >
            <ArrowDown className="w-8 h-8 mb-2" />
            <p className="text-body-regular text-center">
              {isDragActive ? "Drop image here" : "Drop an image here"}
            </p>
          </motion.div>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-error text-body-small mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};
