import React, { useState } from "react";
import Forecast from "./MyComponents/Forecast";
const api = {
  key: "f016da3b1ea75ef2166e622b552c7654",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [min, setmin] = useState(0);
  const [max, setmax] = useState(0);
  const [butt, setbutt] = useState("hidden");
  const [time, settime] = useState(0);
  const [flag, setflag] = useState(false);

  // var real_time=Number(weather.list[time].dt_txt.substr(11,2));
  const minmax = (list, date) => {
    let Max = 0;
    let Min = 100;
    list.map((item) => (
      <div>
        {
          (date === Number(item.dt_txt.substr(8, 2))
            ? item.main.temp_max > Max
              ? (Max = item.main.temp_max)
              : ""
            : "",
          date === Number(item.dt_txt.substr(8, 2))
            ? item.main.temp_min < Min
              ? (Min = item.main.temp_min)
              : ""
            : "")
        }
      </div>
    ));

    setmax(Max);
    setmin(Min);
  };
  const tim = (date, list) => {
    let cc = -1;
    let diff = 13;
    let ind = 81.8463;
    let realtime =
      Number(date.getHours()) +
      Math.round((Number(weather.city.coord.lon) - ind) / 15);
    let indate = date.getDate();
    if (realtime > 24) {
      indate += 1;
      realtime -= 24;
    }
    list.map((item) => (
      <div>
        {Number(date.getDate()) === Number(item.dt_txt.substr(8, 2))
          ? Math.abs(date.getHours() - Number(item.dt_txt.substr(11, 2))) < diff
            ? ((diff = Math.abs(
                date.getHours() - Number(item.dt_txt.substr(11, 2))
              )),
              (cc = list.indexOf(item)))
            : ""
          : ""}
      </div>
    ));

    setflag(false);
    settime(cc);
  };
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          setmin(0);
          setmax(0);
          setbutt("hidden");
          console.log(result);
          setflag(true);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div>
      <div
        className={
          typeof weather.list != "undefined"
            ? weather.list[time].weather[0].main === "sunny"
              ? "app sunny"
              : (weather.list[time].weather[0].main === "Rain"
                  ? "app rainy"
                  : weather.list[time].weather[0].main === "Clouds"
                  ? "app cloudy"
                  : weather.list[time].weather[0].main === "Clear"
                  ? "app"
                  : "app cloudy")
            : "app cloudy"
        }
      >
        <main>
          <div onMouseEnter={() => console.log(time)} className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Enter Your City..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={search}
              value={query}
            />
          </div>

          {typeof weather.list != "undefined" && typeof time != "undefined" ? (
            <div>
              {flag && tim(new Date(), weather.list)}

              <div className="location-box">
                <div className="location">
                  {weather.city.name} {weather.city.country}
                </div>

                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div
                onMouseEnter={() => minmax(weather.list, new Date().getDate())}
                className="weather-box"
              >
                <div className="temp">
                  {Math.round(weather.list[time].main.temp)}°c
                  <div className="temprange">
                    Max: {Math.round(max)} <span>&nbsp;</span> Min:{" "}
                    {Math.round(min)}
                  </div>
                </div>
                <div className="weather">
                  {weather.list[time].weather[0].main}
                </div>
              </div>

              <div className="wrapper">
                <button
                  onClick={() => {
                    setbutt("show");
                  }}
                  type="button"
                  className="btn btn-primary"
                >
                  4 Day Forecast
                </button>
              </div>
              <br />
            </div>
          ) : (
            ""
          )}
          <div>
            {butt === "show" && <Forecast list={weather.list} time={time} />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
