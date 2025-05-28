import { useState } from 'react'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [notification, setNotification] = useState(null)

  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)

    if (nameExists) {
      setNotification(`El nombre '${newName}' ya está en la agenda.`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      return
    }

    const personObject = {
      name: newName,
    }  

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name}</li>
          
        ))}
      </ul>    
    </div>
  )
}

export default App