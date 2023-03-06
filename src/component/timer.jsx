import React, { useState, useEffect } from 'react';

function Timer({ startTimer , mistakeText, correctText , setTextLimit,activeWordIndex,corectText,sizeOfText,textlimit}) {
  const [timeLeft, setTimeLeft] = useState(15);
  const [showResult,setShowResult] = useState(false)
  const [score,setScore] = useState(0)


  


  useEffect(() => {


    if(startTimer && activeWordIndex < sizeOfText){

      const intervalId = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);

  
        if(timeLeft === 0){
           clearInterval(intervalId)
           setShowResult(true)
           setTextLimit(true)

           }
        if(textlimit === true)
     {

      clearInterval(intervalId)
      setShowResult(true)
  

     }

     setScore((11 / timeLeft) * 30);
     console.log(score)
 return () => clearInterval(intervalId);
}
 }, [startTimer,timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const secondsRemaining = timeLeft % 60;

  return (
    <>
    <div>
      {`${minutes}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`}
    </div>

    {showResult && <div>
      correctText : {correctText}
    mistake : {mistakeText}
    score:{score.toFixed(2)}
      </div>}


    </>
  );
}

export default Timer;