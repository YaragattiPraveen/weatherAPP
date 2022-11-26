import './App.css';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import { useEffect, useState } from 'react';
function App() {
  const [cityName, setcityName] = useState();
  const [data, setData] = useState({});

  const fetchApi = async () => {
    if (cityName === undefined || cityName === '') {
      alert('Please enter the valid city name')
    } else {
      try {
        const getData = await fetch(`http://api.openweathermap.org/data/2.5/weather?appid=0e1d95239fda1530164d4d014e4aa762&q=${cityName}`);
        const response = await getData.json();
        setData(response);
        setcityName("");
      } catch (error) { 
        alert(error);
      }
    }

  }
  const submit = () => {
    fetchApi()
  }

  useEffect(()=>{
    const defaultData = async ()=>{
      const defaultCityData = await fetch("http://api.openweathermap.org/data/2.5/weather?appid=0e1d95239fda1530164d4d014e4aa762&q=Pune");
      const response = await defaultCityData.json()
      setData(response);
    }
    defaultData()
  },[])
  return (
    <div className="App">
      <div className='center_div'>
        <div className='input'>
          <input type='text' required placeholder='search...' value={cityName} onKeyPress={(event)=>{
            if(event.key === 'Enter'){
              fetchApi()
            }
          }} onChange={(e) => setcityName(e.target.value)} />
          <input type='submit' className="button" onClick={submit}/>
        </div>
        {data.name !== undefined && <div className='container'>
          <div className='city_details'>
            {
              data ? <h1>{data?.name},{data?.sys ? <>{data.sys.country}</> : <h1>Data not found</h1>}</h1> : null
            }
            {
              data ? <span>{new Date().toLocaleString()}</span>: null
            }
            {/* <span>Tuesday 20 September</span> */}
          </div>
          <div className='weather_details'>
            <div className='logo_weather'>
              <CloudOutlinedIcon style={{
                fontSize: '5rem',
                color: '#fff',
                margin: '0 1rem'
              }} />
              <div>
                {data.main ? <h1>{((data.main.temp) - 273.15).toFixed()}°c</h1> : null}
                {data.weather ? <span>{data.weather[0].main}</span> : null}
              </div>
            </div>
            <div className='detailed_weather'>
              <div className='High_weather'>
                <div className='high'>
                  {data.main ? <h2>{((data.main.temp_max) - 273.15).toFixed()}°c</h2> : null}
                  <span>High</span>
                </div>
                <div className='sun'>
                  {data.sys ? <h4>{new Date(data.sys.sunrise * 1000).toLocaleTimeString('default')}</h4> : null}
                  <span>Sunrise</span>
                </div>
              </div>
              <div className='High_weather'>
                <div className='high'>
                  {data.main ? <h2>{((data.main.temp_min) - 273.15).toFixed()}°c</h2> : null}
                  <span>Low</span>
                </div>
                <div className='sun'>
                  {
                    data.sys ? <h4> {new Date(data.sys.sunset * 1000).toLocaleTimeString('default')}</h4> : null
                  }
                  <span>Sunset</span>
                </div>
              </div>
            </div>
          </div>
        </div>}


      </div>
    </div>
  );
}

export default App;
