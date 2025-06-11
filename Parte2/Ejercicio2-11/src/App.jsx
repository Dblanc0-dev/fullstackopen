import { useState, useEffect } from 'react'
import axios from 'axios'
import Notification from './Notification'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([])

useEffect(() => {
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
    .catch(error => {
      console.error('Error al obtener los datos:', error)
      setNotification('Error al obtener los contactos.')
      setTimeout(() => setNotification(null), 5000)
    })
}, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (newName.trim() === '' || newNumber.trim() === '') {
      setNotification('Por favor, completa el nombre y el número.')
      setTimeout(() => setNotification(null), 5000)
      return
    }

    const nameExists = persons.some(person => person.name === newName)

    if (nameExists) {
      setNotification(`El nombre '${newName}' ya está en la agenda.`)
      setTimeout(() => setNotification(null), 5000)
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

  const handleNameChange = (e) => setNewName(e.target.value)

  const handleNumberChange = (e) => {
    const input = e.target.value
    const filteredInput = input.replace(/[^0-9\s-]/g, '')
    setNewNumber(filteredInput)
  }

  const handleSearchChange = (e) => setSearchTerm(e.target.value)

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />

      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
