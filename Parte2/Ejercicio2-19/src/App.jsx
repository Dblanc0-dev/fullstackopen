import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

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
    setSelectedCountry(null) // Reiniciamos selección si cambia el filtro
  }, [filter, countries])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  const renderCountryDetails = (country) => (
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

  const renderCountries = () => {
    if (filter === '') {
      return <p>Introduce un país para comenzar</p>
    }

    if (selectedCountry) {
      return renderCountryDetails(selectedCountry)
    }

    if (filteredCountries.length > 10) {
      return <p>Demasiados resultados. Especifica más.</p>
    } else if (filteredCountries.length > 1) {
      return (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}{' '}
              <button onClick={() => handleShowCountry(country)}>mostrar</button>
            </li>
          ))}
        </ul>
      )
    } else if (filteredCountries.length === 1) {
      return renderCountryDetails(filteredCountries[0])
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
