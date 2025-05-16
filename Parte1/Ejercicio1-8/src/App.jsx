import { useState } from 'react'

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
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>total {total}</p>
      <p>average {average.toFixed(1)}</p>
      <p>positive percentage {positPercent.toFixed(1)}%</p>
      <p>negative percentage {negatPercent.toFixed(1)}%</p>
    </div>
  )
}

export default App