import { useNavigate } from "react-router-dom";
import { WaveDecoration } from "../components/Additional/WaveDecoration";
import Primary from "../components/Button/Primary";

const Empty: React.FC = () => {
  const navigate = useNavigate();

  const handleAddMovie = () => {
    navigate("/create-movie");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative px-4 md:px-0">
      <div className="w-full max-w-[480px] mx-auto flex flex-col items-center">
        <h1 className="text-white text-heading-3 md:text-heading-2 font-semibold text-center mb-8">
          Your movie list is empty
        </h1>
        <div className="w-full max-w-[220px]">
          <Primary onClick={handleAddMovie}>Add a new movie</Primary>
        </div>
      </div>
      <WaveDecoration />
    </div>
  );
};

export default Empty;
