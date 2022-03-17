import React, { useState } from "react";
import moment from "moment";
import axios from "axios";

const api = {
  key: "2d9e673f7bf4e81460a9fc36edd7edd4",
  base: "https://api.openweathermap.org/data/2.5",
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("Not found !");

  const searchHandler = (event) => {
    if (event.key === "Enter") {
      axios
        .get(
          `${api.base}/weather?q=${inputValue}&units=metric&APPID=${api.key}`
        )
        .then((response) => {
          setWeather(response.data);
          setInputValue("");
          console.log(response.data);
        })
        .catch((error) => {
          setWeather({});
        });
    }
  };

  return (
    <div className="bg-gray-900 w-full h-screen flex items-center justify-center ">
      <div className="w-11/12 h-96 rounded-xl shadow-xl bg-cold bg-cover md:w-1/2">
        <div className="">
          <input
            type="text"
            className="block m-auto w-1/2 h-10 py-2 px-2 
                rounded-br-xl rounded-bl-xl outline-none 
              border-sky-700 focus:border-b-2 focus:border-r-2 
                focus:border-l-2 shadow-lg text-center"
            placeholder="search"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyPress={searchHandler}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div className="flex items-center justify-center flex-col mt-7 text-xl">
            {/* city */}
            <div className="my-2 text-3xl">{weather.name}, {weather.sys.country}</div>
            {/* moment */}
            <div className="my-2">{moment().format("LLLL")}</div>
            {/* temp */}
            <div
              className="bg-slate-300 bg-opacity-50 
              p-11 rounded-md shadow-lg text-4xl"
            >
              {Math.round(weather.main.temp)}&deg;C
            </div>
            <div className="text-2xl my-4">{weather.weather[0].main}</div>
          </div>
        ) : (
          <div
            className="flex items-center 
              justify-center mt-16 
              text-2xl text-stone-800"
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
