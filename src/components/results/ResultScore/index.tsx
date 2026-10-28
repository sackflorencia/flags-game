import "./ResultScore.css";

interface ResultScoreProps {
  score: number;
}

const ResultScore = ({ score }: ResultScoreProps) => {
  return (
    <div className="result-score">
      <h2>Your score</h2>
      <p>{score}</p>
    </div>
  );
};

export default ResultScore;