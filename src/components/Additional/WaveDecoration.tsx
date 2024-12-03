export const WaveDecoration: React.FC = () => (
  <div className="absolute bottom-0 left-0 right-0 h-[120px] md:h-[180px] overflow-hidden">
    <div className="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 320" className="w-full" preserveAspectRatio="none" style={{ height: "120px" }}>
        <path
          fill="#224957"
          fillOpacity="0.2"
          d="M0,32L48,42.7C96,53,192,75,288,101.3C384,128,480,160,576,154.7C672,149,768,107,864,90.7C960,75,1056,85,1152,90.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
      <svg
        viewBox="0 0 1440 320"
        className="w-full absolute bottom-0"
        preserveAspectRatio="none"
        style={{ height: "120px" }}
      >
        <path
          fill="#224957"
          fillOpacity="0.3"
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,117.3C672,107,768,117,864,128C960,139,1056,149,1152,144C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </div>
  </div>
);
