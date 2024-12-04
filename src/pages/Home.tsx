import { motion } from "motion/react";
import { WaveDecoration } from "../components/Additional/WaveDecoration";
import { SignInForm } from "../components/Form/SignInForm";

const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background flex flex-col items-center justify-center relative px-4 md:px-0"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[480px] mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white text-heading-2 font-semibold text-center mb-8 md:mb-8"
        >
          Sign in
        </motion.h1>
        <SignInForm />
      </motion.div>
      <WaveDecoration />
    </motion.div>
  );
};

export default Home;
