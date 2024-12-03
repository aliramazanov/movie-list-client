import { WaveDecoration } from "../components/Additional/WaveDecoration";
import { SignInForm } from "../components/Form/SignInForm";

const Home: React.FC = () => {
  const handleSignIn = (email: string, password: string, rememberMe: boolean) => {
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative px-4 md:px-0">
      <div className="w-full max-w-[480px] mx-auto">
        <h1 className="text-white text-heading-2 font-semibold text-center mb-8 md:mb-8">Sign in</h1>
        <SignInForm onSubmit={handleSignIn} />
      </div>
      <WaveDecoration />
    </div>
  );
};

export default Home;
