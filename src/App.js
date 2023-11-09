import React, { useEffect, useState } from 'react'
import './App.css';


const api = {
  key: "91f8a66089bee6022a6a6c59cddaa5f5",
  base: "https://api.openweathermap.org/data/2.5/",
}
function App() {

  const [searchInput, setSearchInput] = useState("")
  const [searchCity, setSearchCity] = useState("")
  const [weatherInfo, setWeatherInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchWeatherData = async ()=>{
      if (!searchCity) return;
      setLoading(true)
      try {
        const url = `${api.base}weather?q=${searchCity}&unit=metric&appid=${api.key}`
        const response = await fetch(url);
        const data = await response.json()
        if(response.ok){
          setWeatherInfo(
            `${data.name},${data.sys.country} ${data.weather[0].description},${data.main.temp}`
          )
          setErrorMessage('')
        }else{
          setErrorMessage(data.message)
        }

        

      }catch(err){
        setErrorMessage(err.message)
      }




      setLoading(false)
    }
    fetchWeatherData()
   
  }, [searchCity])
  

  const handleSubmit = (e)=>{
    e.preventDefault()
    setSearchCity(searchInput)
  }
  return (
  <>
    <form onSubmit={handleSubmit}> 
      <input 
      type='text' 
      placeholder='City' 
      value={searchInput} 
      onChange={(e)=>{setSearchInput(e.target.value)
      }}/>
      <button> Search</button>
    </form>
    
      {loading ? (<div>loading...</div>
      ) : (
        <>
        {errorMessage ? (
            <div style={{color: 'red'}}>{errorMessage}</div>
            ):(
            <div>{weatherInfo}</div>
        )}
        </>
    )}


    
    
    
  </>
)}

export default App;
