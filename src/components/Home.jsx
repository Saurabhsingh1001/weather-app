import { useState } from 'react'
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
      
  const handleClick =async () => {
    if (name !== "") {
      try {
        const res = await axios.get(`https://weather-app-backend-28hz.onrender.com/api/weather?city=${name}`);
        console.log(res.data);
        const weather = res.data.weather[0].main;
        
        let imagePath = "";
        if (weather === "Clouds") imagePath = "clear.png";
        else if (weather === "Clear") imagePath = "pngwing.com.png";
        else if (weather === "Rain") imagePath = "raining.png";
        else if (weather === "Drizzle") imagePath = "rainy.png";
  
        setData({
          celcius: res.data.main.temp,
          name: res.data.name,
          humidity: res.data.main.humidity,
          speed: res.data.wind.speed,
          image: imagePath,
        });
      } catch (err) {
        console.error(err);
      }
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
