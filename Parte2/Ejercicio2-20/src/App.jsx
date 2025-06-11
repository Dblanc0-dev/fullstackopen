import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const api_key = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (!selectedCountry) {
      setWeather(null)
      return
    }

    const capital = selectedCountry.capital?.[0]
    if (!capital) return

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`
    console.log('Clima URL:', url)

    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        console.error('Error al obtener clima:', error)
        setWeather(null)
      })
  }, [selectedCountry, api_key])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
  }

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  const renderWeather = () => {
    if (!weather) {
      console.log('⛅ No hay datos meteorológicos disponibles todavía.')
      return null
    }

    console.log('✅ Mostrando clima para:', selectedCountry.capital?.[0])

    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

    return (
      <div>
        <h3>Clima en {selectedCountry.capital[0]}</h3>
        <p>Temperatura: {weather.main.temp} °C</p>
        <img src={iconUrl} alt={weather.weather[0].description} />
        <p>Viento: {weather.wind.speed} m/s</p>
      </div>
    )
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
      {renderWeather()}
    </div>
  )

  const renderCountries = () => {
    if (selectedCountry) {
      return renderCountryDetails(selectedCountry)
    }

    if (filteredCountries.length > 10) {
      return <p>Demasiados resultados, especifica otra búsqueda.</p>
    }

    if (filteredCountries.length === 1) {
      return renderCountryDetails(filteredCountries[0])
    }

    return filteredCountries.map(country => (
      <div key={country.cca3}>
        {country.name.common}{' '}
        <button onClick={() => handleShowCountry(country)}>Mostrar</button>
      </div>
    ))
  }

  return (
    <div>
      <label>Buscar país: </label>
      <input value={search} onChange={handleSearchChange} />
      {renderCountries()}
    </div>
  )
}

export default App
