import { Die } from "./components/Die"
import React from "react"
import {nanoid} from "nanoid"
import { Header } from "./components/Header";
import Confetti from 'react-confetti-boom';
function App() {

  function generateAllNewDice(){
    let newNumbers =[];
    for(let i=0;i<10;i++){
      let randomNumber = Math.floor(Math.random() * 6) + 1;
      newNumbers.push({
        id:nanoid(),
        number:randomNumber,
        isHeld:false})
    }
    return newNumbers
  }

  const [newDice, setNewDice] = React.useState(generateAllNewDice)
   let diceElements = newDice.map(valueObj =>{
     return(
     <Die 
     key={valueObj.id} 
     value={valueObj.number} 
     isHeld={valueObj.isHeld}  
     hold={hold} 
     id={valueObj.id}
     />)
   })

  function reRollDice(){
    if(gameWon)
      setNewDice(oldDice => generateAllNewDice())
    else
    setNewDice(oldDice => oldDice.map(
      die => !die.isHeld ? {...die, number:Math.floor(Math.random() * 6) + 1} : die))
   
  }

  function hold(id){
    setNewDice(oldDice => oldDice.map( die => die.id === id ? {...die, isHeld: !die.isHeld} : die))
  }


  const gameWon = newDice.every(die => die.isHeld) && newDice.every(die => die.number === newDice[0].number)

  return (
    <main>
      <Header />
        <div className="diesContainer">
          {diceElements}
        </div>
        <button className="reRollButton" onClick={reRollDice}>{gameWon ? "New Game" : "Roll"}</button>
        {gameWon && <Confetti mode="boom" particleCount={100}/>}
    </main>
  )
}

export default App
