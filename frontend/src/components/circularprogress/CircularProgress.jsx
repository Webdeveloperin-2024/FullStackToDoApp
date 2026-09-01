import "./CircularProgress.css";

const CircularProgress = ({ progress,startAngle }) => {

  const radius = 22.5;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="circular-progress">

      <svg  style={{
              transform: `rotate(${startAngle}deg)`,
              width: 50,
              height: 50
          
 }}>

        {/* background */}
        <circle
          className="progress-bg"
          cx="25"
          cy="25"
          r={radius}
        />

        {/* value */}
        <circle
          className="progress-fill"
          cx="25"
          cy="25"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />

      </svg>

     

    </div>
  );
};

export default CircularProgress;