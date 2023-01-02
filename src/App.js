import React from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

  //dice array which holds object all the 10 dice
  //the state is initialized to allNewDice()
  const [dice, setDice] = React.useState(allNewDice())

  //this state is used to know if the game is won or still in progress
  const [tenzies, setTenzies] = React.useState(false)

  //this state is used to keep track of the number of times the dice are rolled
  const [countNum, setCountNum] = React.useState(0)

  //useEffect() is used when two states need to stay in sync
  //the array of dependencies is set to dice so that every time state "dice" changes,
  //the component is re rendered
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  //new die is created using this function
  //the die object has value, isHeld and id properties
  //the value can be any number from 1-6
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  //set of 10 dice are generated using this function
  //the newly created single dice object from generateNewDie() is pushed into newDice array
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  //if game is not won (tenzies state is false)
  //setDice will be used to update the value of die
  //if die.isHeld is true, keep the die same
  //else generateNewDie() 
  //if game is won, new up new game with new set of 10 dice created using generateNeDie()
  //and set the state of tenzies to false
  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }

    //update the state of count after every role
    setCountNum(prevCount => countNum + 1)
  }

  //if id is same as the id of the die clicked,
  //keep die object same and change isHeld to reverse of the previous amount
  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  //render the 10 dice on the screen
  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  return (
    <main>
      {/* //if game is won, render the confetti on the screen */}
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same.
        Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button
        className="roll-dice"
        onClick={rollDice}
      >
        {/* if game is won, change the text of button to New Game */}
        {tenzies ? "New Game" : "Roll"}
      </button>
      <div>Count : {countNum} </div>
    </main>
  )
}