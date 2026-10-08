import ModeSelector from "../components/home/ModeSelector";
import Leaderboard from "../components/home/Leaderboard";
import PlayButton from "../components/home/PlayButton";

const HomePage = () => {
  return (
    <main>
      <h1>Flag Guess</h1>

      <ModeSelector />

      <Leaderboard />

      <PlayButton />
    </main>
  );
};

export default HomePage;