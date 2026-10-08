import "./LeaderboardEntry.css";

interface LeaderboardEntryProps {
  position: number;
  username: string;
  score: number;
}

const LeaderboardEntry = ({
  position,
  username,
  score,
}: LeaderboardEntryProps) => {
  return (
    <div>
      <span>{position}</span>
      <span>{username}</span>
      <span>{score}</span>
    </div>
  );
};

export default LeaderboardEntry;