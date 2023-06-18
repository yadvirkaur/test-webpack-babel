import React from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Die from './components/Die'

export default function App() {
  const [tenzies, setTenzies] = React.useState(false)
  const [count, setCount] = React.useState(0)
  const [timer, setTimer] = React.useState(0)
  const [isActive, setIsActive] = React.useState(false)
  const countRef = React.useRef(null)

  const [bestScores, setBestScores] = React.useState(
    JSON.parse(localStorage.getItem('bestScores')) || []
  )

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i += 1) {
      newDice.push(generateNewDie())
    }
    return newDice
  }
  const [dice, setDice] = React.useState(allNewDice())

  const handleStart = () => {
    setIsActive(true)
    countRef.current = setInterval(() => {
      setTimer((pretimer) => pretimer + 1)
    }, 1000)
  }
  const handleReset = () => {
    clearInterval(countRef.current)
    setIsActive(false)
    setTimer(0)
  }
  const handlePause = () => {
    clearInterval(countRef.current)
  }

  React.useEffect(() => {
    if (bestScores.length > 1) {
      const timeList = [...bestScores]
      timeList.sort()
      timeList.splice(1)
      setBestScores(timeList)
    }

    localStorage.setItem('bestScores', JSON.stringify(bestScores))
  }, [bestScores])

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every((die) => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      handlePause()

      setBestScores((prebestScores) => [...prebestScores, timer])
    }
    // eslint-disable-next-line
  }, [dice])

  function rollDice() {
    if (!tenzies) {
      setCount((prevCount) => prevCount + 1)
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie()
        })
      )
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setCount(0)
      handleReset()
      handleStart()
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  const updateTime = () => {
    const s = timer % 60
    const m = Math.floor(timer / 60) % 60
    const h = Math.floor(timer / 3600)

    return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}:${
      s < 10 ? '0' : ''
    }${s}`
  }

  return (
    <main>
      {isActive ? (
        <div className="gamepage">
          <div className="scores">
            {' '}
            <div>{updateTime()}</div>{' '}
            <div> Best-time-scores: {bestScores} </div>
          </div>
          {tenzies && <Confetti />}

          <h1 className="title">Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="dice-container">{diceElements}</div>
          <div>Number of rolls:{count}</div>

          <button type="button" className="roll-dice" onClick={rollDice}>
            {tenzies ? 'New Game' : 'Roll'}
          </button>
        </div>
      ) : (
        <div>
          <button type="button" className="roll-dice" onClick={handleStart}>
            Play Game
          </button>
        </div>
      )}
    </main>
  )
}
