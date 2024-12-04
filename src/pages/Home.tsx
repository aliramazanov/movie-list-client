import { motion } from "motion/react";
import { SignInForm } from "../components/Form/SignInForm";
import { PageWrapper } from "../components/Wrapper/PageWrapper";

const Home: React.FC = () => {
  return (
    <PageWrapper className="items-center justify-center px-4 md:px-0">
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
    </PageWrapper>
  );
};

export default Home;
