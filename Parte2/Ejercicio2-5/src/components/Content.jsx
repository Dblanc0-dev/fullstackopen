import Part from './Part'

const Content = ({ parts }) => (
  <div>
    {parts.map((part, index) => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </div>
)

export default Content