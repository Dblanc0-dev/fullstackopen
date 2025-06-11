import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    const result = countries.filter(country =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    )
    setFilteredCountries(result)
  }, [filter, countries])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const renderCountries = () => {
    if (filter === '') {
      return <p>Introduce un país para comenzar</p>
    }

    if (filteredCountries.length > 10) {
      return <p>Demasiados resultados. Especifica más.</p>
    } else if (filteredCountries.length > 1) {
      return (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3}>{country.name.common}</li>
          ))}
        </ul>
      )
    } else if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      return (
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Área: {country.area} km²</p>
          <h3>Idiomas:</h3>
          <ul>
            {Object.values(country.languages).map(lang => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={`Bandera de ${country.name.common}`} width="150" />
        </div>
      )
    } else {
      return <p>No hay resultados.</p>
    }
  }

  return (
    <div>
      <h1>Buscar países</h1>
      <input value={filter} onChange={handleFilterChange} placeholder="Ej. Finland" />
      {renderCountries()}
    </div>
  )
}

export default App
