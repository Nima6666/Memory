import Header from "./components/header";
import GameBoard from "./components/gameboard";
import { useState } from "react";
import Start from "./components/start";
import End from "./components/end";
import ScoreBoard from "./components/scoreBoard";
function App() {
  const [start, setStart] = useState(true);
  const [end, setEnd] = useState(false);
  const [message, setMessage] = useState("");
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  if (start) {
    return (
      <>
        <Header />
        <Start setStart={setStart} />
      </>
    );
  }

  if (end) {
    return (
      <>
        <>
          <Header />
          <ScoreBoard currentScore={currentScore} highScore={highScore} />
          <End
            message={message}
            setStart={setStart}
            setEnd={setEnd}
            end={end}
            setCurrentScore={setCurrentScore}
          />
        </>
      </>
    );
  }
  return (
    <>
      <Header />
      <GameBoard
        end={end}
        setEnd={setEnd}
        setMessage={setMessage}
        currentScore={currentScore}
        setCurrentScore={setCurrentScore}
        highScore={highScore}
        setHighScore={setHighScore}
        message={message}
        setStart={setStart}
      />
    </>
  );
}

export default App;
