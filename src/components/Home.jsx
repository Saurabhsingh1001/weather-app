import {useState, useEffect} from 'react'
import '../Styles/home.css'
import axios from 'axios'
const Home = () => {

  const [data, setData] = useState({
    celcius: 10,
    name: 'Bangalore',
    humidity: 10,
    speed: 2,
    image: 'pngwing.com.png'
  })

  const[name, setName] = useState('');
      
  const handleClick =() => {
    if(name !== ""){
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=558e17aa1f68d9ada6766e3480eb028a&units=metric`; // change the api key with your original weather app api key
      axios.get(apiUrl)
      .then(res => {
        let imagePath = '';
        if(res.data.weather[0].main == 'Clouds'){
          imagePath = "clear.png"
        }
        else if(res.data.weather[0].main=="Clear"){
          imagePath = "pngwing.com.png"
        }
        else if(res.data.weather[0].main == "Rain"){
          imagePath ="raining.png"
        }
        else if(res.data.weather[0].main == "Drizzle"){
          imagePath ="rainy.png"
        }
        setData({...data, celcius: res.data.main.temp, name: res.data.name,
        humidity: res.data.main.humidity, speed: res.data.wind.speed
        ,image: imagePath})
      })
      .catch(err => console.log(err));
    
    }
  }
  return (
    <div className ="container">
      <div className="weather">
        <div className="search">
          <input type ="text" placeholder="Enter City Name" onChange={e => setName(e.target.value)}/>
          <button><img src="search.png" alt="imgbtn" onClick ={handleClick}/></button>
        </div>

        <div className="winfo">
          <img src={data.image} alt="imaagewinfo" className="icon"/>
          <h1>{Math.round(data.celcius)}°C</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="humid.png" alt="img2"/>
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="wind.png" alt= "img3" />
              <div className="windy">
                <p>{Math.round(data.speed)}Km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Home
