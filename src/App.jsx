
import React, { useRef , useState} from 'react';
import Timer from './component/timer';

 
const textRand = () => `Reprehenderit mollit quis esse tempor non commodo officia magna sint anim.`.split(' ').sort(() => Math.random() > 0.5 ? 1 : -1)
function App() {

  const [userInput , setUserInput] = useState('')
  const text = useRef(textRand())
  const [activeWordIndex,setActiveWordIndex] = useState(0)
  const [correctText,setCorrectText] = useState(0)
  const [mistakeText,setMistakeText] = useState(0)
  const [startTimer,setStartTimer] = useState(false)
  const [correctWordArray,setCorrectWordArray] = useState([])
  const [textlimit,setTextLimit] = useState(false)

  let sizeOfText = text.current.length;



  const Word = (props) => {
    const {text , active , correct} = props

    if(correct === true){

      return <span className='text-[#4d9e2b]' >{text} </span>
    }
    
    if(correct === false){
     
      return <span className='text-amber-600 line-through'>{text} </span>
    }

    if(active){
      return <span className='text-[#07070744] font-extrabold'>{text} </span>
    }

    return <span className='text-[#00000044]'>{text} </span>

  }


  const processInput = (value) =>{

    if(!startTimer){
      setStartTimer(true)
    }


    if(activeWordIndex < sizeOfText){

      if(value.endsWith(' ')){

   
        setActiveWordIndex(index => index + 1)
        setUserInput('')

      

          setCorrectWordArray(data => {
            const word = value.trim()
            const newResult = [...data]
            newResult[activeWordIndex] = word === text.current[activeWordIndex]

            if(newResult[activeWordIndex] === false){

              setMistakeText(mistakeText + 1)

            }

            if(newResult[activeWordIndex] === true){
              setCorrectText(correctText + 1)
            }


            return newResult
          })
    
      }
      else{
        setUserInput(value)
      }
    }
    else{
      setTextLimit(true)
    }

  }


  return (
    <>
<div className='p-5 flex flex-col  justify-center mx-auto '>
  <h1 className='text-[#2e4155] text-[20px]'>Typing Assesment</h1>
    <p className='text-[20px] tracking-wide break-all ...'>{text.current.map((word,index) => {
return <Word  
      text={word}
      active={index === activeWordIndex}
      correct={correctWordArray[index]} />      
     
        })}</p>

    <hr className='border bottom-7 w-1/2'/>
      <input type="text" className='mt-2 shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' disabled={textlimit} value={userInput} onChange={(e) => processInput(e.target.value)}/>    
      </div>


      <div className='flex items-center flex-col justify-center'>
        <Timer
        startTimer={startTimer} 
        mistakeText={mistakeText}
        correctText={correctText}
        setTextLimit={setTextLimit}
        activeWordIndex={activeWordIndex}
        corectText={correctText}
        sizeOfText={sizeOfText}
        textlimit={textlimit}
        />


      </div>
      </>
  )
};

export default App;
