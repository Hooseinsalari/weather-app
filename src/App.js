import React, { useState } from "react";
import moment from "jalali-moment"
import axios from "axios";

const api = {
  key: "2d9e673f7bf4e81460a9fc36edd7edd4",
  base: "https://api.openweathermap.org/data/2.5",
};

function App() {
  const [inputValue, setInputValue] = useState('')
  const [weather, setWeather] = useState({})
  // const [error, setError] = useState("")

  // const submitHandler = (event) => {
  //   event.preventDefault()
  //   fetch(`${api.base}/weather?q=${inputValue}&appid=${api.key}`)
  //   .then((response) => response.json())
  //   .then((r) => console.log(r))
  //   .catch((error) => console.log(error.message))
  // }

  const searchHandler = (event) => {
    if(event.key === "Enter") {
      axios.get(`${api.base}/weather?q=${inputValue}&units=metric&APPID=${api.key}`)
       .then((response) =>{
         setWeather(response.data)
         setInputValue('')
         console.log(response.data)
        })
    }
  }

  return (
    <div className="bg-gray-900 w-full h-screen flex items-center justify-center ">
      <div className="w-11/12 h-96 rounded-xl shadow-xl bg-cold bg-cover md:w-1/2">
        <div className="">
          <input
            type="text"
            className="placeholder:italic placeholder:text-slate-800 block bg-gray-200 w-3/4 m-auto border border-slate-300 border-t-0 rounded-br-2xl rounded-bl-2xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-t-white focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="جستوجو کن..."
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyPress={searchHandler}
          />
        </div>
        {typeof weather.main != 'undefined' ?
        <div className="flex items-center justify-center flex-col mt-7 text-xl">
        {/* city */}
        <div className="my-4 text-3xl">
          {weather.name}
        </div>
        {/* moment */}
        <div className="my-4">
          {moment().locale('fa').format('LLLL')}
        </div>
        {/* temp */}
        <div className="bg-slate-300 bg-opacity-50 p-11 rounded-md shadow-lg text-4xl">
        {Math.round(weather.main.temp)}&deg;C
        </div>
        <div className="text-2xl my-4">
          {weather.weather[0].main}
        </div>
      </div> : ''  
      }
      </div>
    </div>
  );
}

export default App;
