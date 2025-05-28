import { useState } from 'react'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')

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
      number: newNumber,
      id: persons.length + 1
    }  

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />

      <div>
        filter shown with: <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>

        <div>
  number: <input 
    value={newNumber}
    onChange={(e) => {
      const input = e.target.value      
      const filteredInput = input.replace(/[^0-9\s-]/g, '')
      setNewNumber(filteredInput)
    }} 
  />
</div>


        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => (
          <li key={person.id}>{person.name} - {person.number}</li>
        ))}
      </ul>    
    </div>
  )
}

export default App
