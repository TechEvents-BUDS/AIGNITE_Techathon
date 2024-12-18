import { useEffect, useState } from "react";
import API_KEY from "../../GEMINI_API";
import DropDown from "./DrpoDown";

function TemperatureTable() {
  const divShortName = [
    "Okara",
    "Gujranwala",
    "Rawalpindi",
    "Sialkot",
    "Hyderabad",
    "Sargodha",
    "Rahimyar",
    "Quetta",
    "Dera",
    "Swabi",
    "Karachi",
    "Haripur",
    "Daharki",
    "Chitral",
    "Peshawar",
  ];

  const [cityData, setCityData] = useState(null);
  const [cityName, setCityName] = useState("Okara");

  // Function to fetch coordinates of a city
  async function getCoordinates(cityName) {
    const API_URL =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

    try {
      const res = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Provide only latitude and longitude as an array for ${cityName}. Example: [latitude, longitude]`,
                },
              ],
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error(`API returned status: ${res.status}`);
      }

      const data = await res.json();
      const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      const match = content.match(/\[([\d\.\-]+),\s*([\d\.\-]+)\]/);
      if (match) {
        const latitude = parseFloat(match[1]);
        const longitude = parseFloat(match[2]);
        return { latitude, longitude };
      } else {
        throw new Error("Coordinates not found in the API response content");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  }

  // Function to fetch weather data by city
  async function fetchWeatherByCity(cityName) {
    try {
      const coordinates = await getCoordinates(cityName);
      if (!coordinates) {
        return null;
      }

      const { latitude, longitude } = coordinates;
      const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,shortwave_radiation,evapotranspiration`;

      const response = await fetch(weatherApiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data: " + response.statusText);
      }

      const data = await response.json();
      const hourlyData = data.hourly;

      const avgTemperature = calculateAverage(hourlyData.temperature_2m);
      const avgPrecipitation = calculateAverage(hourlyData.precipitation);
      const avgShortwaveRadiation = calculateAverage(
        hourlyData.shortwave_radiation
      );
      const avgEvapotranspiration = calculateAverage(
        hourlyData.evapotranspiration
      );

      return {
        avgTemperature: avgTemperature.toFixed(2),
        avgPrecipitation: avgPrecipitation.toFixed(2),
        avgShortwaveRadiation: avgShortwaveRadiation.toFixed(2),
        avgEvapotranspiration: avgEvapotranspiration.toFixed(2),
      };
    } catch (error) {
      console.error(`Error fetching weather for ${cityName}:`, error);
      return null;
    }
  }

  function calculateAverage(values) {
    const sum = values.reduce((acc, value) => acc + value, 0);
    return sum / values.length;
  }

  useEffect(() => {
    async function fetchData() {
      const data = await fetchWeatherByCity(cityName);
      setCityData(data);
    }
    fetchData();
  }, [cityName]);

  function changeCityName(event) {
    setCityName(event.target.value);
  }

  return (
    <div className="tempTable section">
      <div className="navigateTable">
        <DropDown list={divShortName} onChangeHandler={changeCityName} />
      </div>

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Average Temperature (°C)</th>
              <th>Average Precipitation (mm)</th>
              <th>Average Shortwave Radiation (W/m²)</th>
              <th>Average Evapotranspiration (mm)</th>
            </tr>
          </thead>
          <tbody>
            {cityData ? (
              <tr>
                <td>{cityData.avgTemperature}</td>
                <td>{cityData.avgPrecipitation}</td>
                <td>{cityData.avgShortwaveRadiation}</td>
                <td>{cityData.avgEvapotranspiration}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TemperatureTable;
