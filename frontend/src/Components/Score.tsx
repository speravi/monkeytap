import { useGame } from "../GameContext";

const Score = () => {
  const { state } = useGame();

  return (
    <div>
      <p className="text-xl text-active">{state.score}</p>
    </div>
  );
};

export default Score;
