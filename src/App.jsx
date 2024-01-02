import { useState } from "react";
import { useEffect } from "react";
import WheatherCard from "./components/WheatherCard";
import axios from "axios";
import './components/WheatherCard'
import './App.css'



function App() {
  const [coords, setCoord] = useState()
 const [weather, setWeather] = useState()
const [tempert, setTempert] = useState()
const [isLoading, setIsLoading] = useState(true)

   const gps = pos => {
    const obj = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoord(obj)
  }
  
  useEffect (() => {
    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(gps)
  }, []) 


 useEffect (()=> {
    if (coords) {

  const API_KEY = '17068b7f70bf629f445f34c317023c19'
  const { lat, lon } = coords
  
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  
      
    axios.get(url)
      .then(res => {
        setWeather (res.data)
        const obj = {
          celsius: (res.data.main.temp -273.15).toFixed(1),
          fahrenheit: ((res.data.main.temp - 273.15) * 9 / 5 + 32).toFixed(1)
        }

        setTempert (obj)
      }) 
        
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))

    }
  }, [coords])

  console.log(weather)
  
  return (
    <div className="app">
    {
      isLoading
      ? <h2>Loading...</h2>
      :(<WheatherCard 
        weather={weather}
        tempert={tempert}/>
        )
    }
      
    </div>
      
  )
}

export default App
