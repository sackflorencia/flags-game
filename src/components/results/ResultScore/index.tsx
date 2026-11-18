import "./ResultScore.css";

interface ResultScoreProps {
  score: number;
}

const getScoreMessage = (score: number) => {
  if (score >= 12) return "Puntuación sobresaliente. Gran dominio de la geografía mundial.";
  if (score >= 7) return "Muy buen desempeño. Tu velocidad y precisión son destacadas.";
  if (score >= 4) return "Buen intento. Seguí practicando para superar tu marca.";
  return "Buen comienzo. Cada partida te ayuda a memorizar nuevas banderas.";
};

const ResultScore = ({ score }: ResultScoreProps) => {
  return (
    <div className="result-score-container">
      <span className="result-score-kicker">Puntuación Obtenida</span>
      <div className="result-score-display">
        <span className="result-score-number">{score}</span>
        <span className="result-score-units">
          {score === 1 ? "punto" : "puntos"}
        </span>
      </div>
      <p className="result-score-message">{getScoreMessage(score)}</p>
    </div>
  );
};

export default ResultScore;
