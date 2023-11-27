export default function End({ message, setStart, setEnd, setCurrentScore }) {
  function playAgain(e) {
    e.preventDefault();
    setCurrentScore(0);
    setStart(false);
    setEnd(false);
  }

  return (
    <>
      <div id="end">
        <div className="text">{message}</div>
        <button id="again" onClick={(e) => playAgain(e)}>
          <h1>Play again</h1>
        </button>
      </div>
    </>
  );
}
