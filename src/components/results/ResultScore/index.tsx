interface ResultScoreProps {
  score: number;
}

const ResultScore = ({ score }: ResultScoreProps) => {
  return (
    <div>
      <p>Your score</p>
      <strong>{score}</strong>
    </div>
  );
};

export default ResultScore;