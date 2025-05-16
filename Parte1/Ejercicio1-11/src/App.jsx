import { useState } from 'react'
import Statistics from './Statistics'
import Button from './Button'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good - bad) / total
  const positPercent = total === 0 ? 0 : (good / total) * 100
  const negatPercent = total === 0 ? 0 : (bad / total) * 100

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positPercent={positPercent}
        negatPercent={negatPercent}
      />
    </div>
  )
}

export default App