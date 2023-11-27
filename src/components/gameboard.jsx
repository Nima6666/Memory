import { useEffect } from "react";
import { useState } from "react";
import apiCaller from "../scripts/apiCaller";
import ScoreBoard from "./scoreBoard";
import End from "./end";

export default function GameBoard({
  setEnd,
  setMessage,
  message,
  highScore,
  setHighScore,
  currentScore,
  setCurrentScore,
}) {
  const [diaplayImages, setDisplayImages] = useState([]);
  const [arrayOfClickedIndex, setArrayOfClickedIndex] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiCaller();
        const newArray = [];
        for (let i = 0; i < data.data.length; i++) {
          let titl = data.data[i].title.split(" ");
          titl.splice(-3, 3);
          titl = titl.join(" ");
          newArray.push({
            url: data.data[i].images.original_still.url,
            title: titl,
            index: i,
          });
        }
        const uniqueArray = newArray.filter(
          (image, index) => newArray.indexOf(image) == index
        );

        setDisplayImages(uniqueArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function suffle() {
    diaplayImages.sort(() => Math.random() - 0.5);
    const suffeled = diaplayImages;
    setDisplayImages(suffeled);
  }

  function checkKing(score) {
    if (score == diaplayImages.length) {
      message = "Memory King 👑";
      setMessage(message);
      setHighScore(15);
      setEnd(true);
      setArrayOfClickedIndex([]);
      return;
    }
  }

  function recordScore(e) {
    const indexClickedAt = e.target.id.split("i")[0];

    for (let i = 0; i < arrayOfClickedIndex.length; i++) {
      if (arrayOfClickedIndex[i] == indexClickedAt) {
        if (highScore < currentScore) {
          setHighScore(currentScore);
          message = "You just set the high Score";
          setMessage(message);

          setEnd(true);
          setArrayOfClickedIndex([]);
          return;
        }
        message = "Oops!! you just clicked on same Emoji Twice";
        setMessage(message);
        setEnd(true);
        setArrayOfClickedIndex([]);
        return;
      }
    }
    const arrayOfClickedOnes = [...arrayOfClickedIndex];
    arrayOfClickedOnes.push(indexClickedAt);
    setArrayOfClickedIndex(arrayOfClickedOnes);
    setCurrentScore(currentScore + 1);
    checkKing(currentScore + 1);
    suffle();
  }

  function hoverEffect(e) {
    const midHeight = e.target.clientHeight / 2;
    const midWidth = e.target.clientWidth / 2;
    // console.log(e.target.clientHeight, e.target.clientWidth);
    // console.log(e.pageX, e.pageY);
    // console.log(e.target.offsetLeft, e.target.offsetTop);
    // console.log(
    //   e.target.offsetLeft - e.pageX + midWidth,
    //   e.target.offsetTop - e.pageY + midHeight
    // );
    const shadowX = e.target.offsetLeft - e.pageX + midWidth;
    const shadowY = e.target.offsetTop - e.pageY + midHeight;
    document.getElementById(`${e.target.id}`).setAttribute(
      "style",
      `box-shadow: ${shadowX / 10}px ${
        shadowY / 10
      }px 3px 5px rgba(0, 0, 0, 0.4); 
        transform: skewX(${-shadowY / 30}deg) skewY(${-shadowX / 30}deg);`
    );
  }

  function hoverOverEffect(e) {
    document
      .getElementById(`${e.target.id}`)
      .setAttribute("style", "box-shadow: 0px 0px 3px 5px rgba(0,0,0,0.4)");
  }

  return (
    <>
      <ScoreBoard currentScore={currentScore} highScore={highScore} />
      <div className="imageContainer">
        <div className="Images">
          {diaplayImages.length &&
            diaplayImages.map((image) => {
              return (
                <div
                  className="image"
                  id={image.index + "img"}
                  onMouseMoveCapture={(e) => hoverEffect(e)}
                  onMouseLeave={(e) => hoverOverEffect(e)}
                  key={image.index}
                  onClick={(e) => recordScore(e)}
                >
                  <img src={image.url} />
                  {/* <p>{image.title}</p> */}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
