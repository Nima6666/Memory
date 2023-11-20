// eslint-disable-next-line react/prop-types
export default function ScoreBoard({ currentScore, highScore }) {
  return (
    <div className="scoreBoard">
      <h3>Dont click the same Pic Twice</h3>
      <div className="scores">
        <div className="currentScore">Current Score : {currentScore}</div>
        <div className="highScore">Best Score : {highScore}</div>
      </div>
    </div>
  );
}
