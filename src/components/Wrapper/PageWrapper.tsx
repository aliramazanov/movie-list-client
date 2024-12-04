import { motion } from "motion/react";
import { PageWrapperProps } from "../../definitions";
import Wave from "/Vectors.svg";
import WaveMobile from "/VectorsMobile.svg";

export const PageWrapper = ({ children, className = "" }: PageWrapperProps) => {
  return (
    <div className="min-h-screen bg-background relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`flex flex-col min-h-screen ${className}`}
      >
        {children}
      </motion.div>
      <div>
        <img src={WaveMobile} className="w-full block md:hidden" alt="Wave background mobile" />
        <img src={Wave} className="w-full hidden md:block" alt="Wave background desktop" />
      </div>
    </div>
  );
};
