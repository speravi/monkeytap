type ScoreProps = {
  score: number;
};
//TODO: why can't i just do
// score : number
// wut ?
const Score = ({ score }: ScoreProps) => {
  return (
    <div>
      <p className="text-xl">{score}</p>
    </div>
  );
};

export default Score;
