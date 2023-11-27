// eslint-disable-next-line react/prop-types
export default function ScoreBoard({ currentScore, highScore }) {
  return (
    <div className="scoreBoard">
      <div className="scores">
        <div className="currentScore">Current Score : {currentScore}</div>
        <div className="highScore">Best Score : {highScore}</div>
      </div>
    </div>
  );
}
