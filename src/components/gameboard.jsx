import { useEffect } from "react";
import { useState } from "react";
import apiCaller from "../scripts/apiCaller";
import ScoreBoard from "./scoreBoard";

export default function GameBoard() {
  const [diaplayImages, setDisplayImages] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
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

  function recordScore(e) {
    const indexClickedAt = e.target.id.split("i")[0];
    for (let i = 0; i < arrayOfClickedIndex.length; i++) {
      console.log(arrayOfClickedIndex, indexClickedAt);
      if (arrayOfClickedIndex[i] == indexClickedAt) {
        if (highScore < currentScore) {
          setHighScore(currentScore);
        }
        setCurrentScore(0);
        setArrayOfClickedIndex([]);
        return;
      }
    }
    const arrayOfClickedOnes = [...arrayOfClickedIndex];
    arrayOfClickedOnes.push(indexClickedAt);
    setArrayOfClickedIndex(arrayOfClickedOnes);
    setCurrentScore(currentScore + 1);
    suffle();
  }

  return (
    <>
      <ScoreBoard currentScore={currentScore} highScore={highScore} />
      <div className="Images">
        {diaplayImages.length &&
          diaplayImages.map((image) => {
            return (
              <div
                className="image"
                id={image.index + "img"}
                key={image.index}
                onClick={(e) => recordScore(e)}
              >
                <img src={image.url} />
                <p>{image.title}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}
