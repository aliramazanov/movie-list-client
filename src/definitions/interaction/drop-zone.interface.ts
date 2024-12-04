export interface ImageDropzoneProps {
  selectedFile: File | null;
  error?: string;
  onDrop: (acceptedFiles: File[], rejectedFiles: unknown[]) => void;
  currentPoster?: string;
  className?: string;
}
