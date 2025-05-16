const Statistics = ({ good, neutral, bad, total, average, positPercent, negatPercent }) => {
    if (total === 0) {
        return <p>No feedback given</p>
    }
  return (
    <div>
      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>total {total}</p>
      <p>average {average.toFixed(1)}</p>
      <p style={{ color: 'green' }}>positive percentage {positPercent.toFixed(1)}%</p>
      <p style={{ color: 'red' }}>negative percentage {negatPercent.toFixed(1)}%</p>
    </div>
  )
}

export default Statistics
