import Scoreboard from "../components/game/ScoreBoard";
import Timer from "../components/game/Timer";
import Flag from "../components/game/Flag";
import MultipleChoiceForm from "../components/game/MultipleChoiceForm";
import AnswerFeedback from "../components/game/AnswerFeedback";

const GamePage = () => {
  return (
    <main>
      <Scoreboard />

      <Timer />

      <Flag />

      <MultipleChoiceForm />

      <AnswerFeedback />
    </main>
  );
};

export default GamePage;