import { useGame } from "../GameContext";

const Score = () => {
  const { state } = useGame();

  return (
    <div>
      <p className="text-xl">{state.score}</p>
    </div>
  );
};

export default Score;
