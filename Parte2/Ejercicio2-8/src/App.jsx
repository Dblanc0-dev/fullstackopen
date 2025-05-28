import { useState } from 'react'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: '089606116'}
  ]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [notification, setNotification] = useState(null)

  const addPerson = (event) => {
    event.preventDefault()

    if (newName.trim() === '' || newNumber.trim() === '') {
  setNotification('Por favor, completa el nombre y el número.')
  setTimeout(() => {
    setNotification(null)
  }, 5000)
  return
}


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
      number: newNumber
    }  

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name} - {person.number}</li>
          
        ))}
      </ul>    
    </div>
  )
}

export default App