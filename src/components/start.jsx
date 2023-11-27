export default function Start({ setStart }) {
  return (
    <div id="start">
      <div className="text">Dont click on the same Emoji Twice</div>
      <button id="gameStart" onClick={() => setStart(false)}>
        <h1>Start Game</h1>
      </button>
    </div>
  );
}
