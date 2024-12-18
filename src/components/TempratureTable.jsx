import { useState } from "react";


function TempratureTable(){

   let divShortName = ['Okara', 'Gujranwala', 'Rawalpindi', 'Sialkot', 'Hyderabad', 'Sargodha', 'Rahimyar', 'Quetta', 'Dera', 'Swabi', 'Bhawal', 'Palandri', 'Haripur', 'Daharki', 'Chitral', 'Peshawar']

    
async function getCoordinates(cityName) {
    const geocodeApiKey = "02970067d7394aeb884ba5917f935204"; // Replace with your OpenCage API key
    const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(cityName)}&key=${geocodeApiKey}`;
  
    try {
      const response = await fetch(geocodeUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch coordinates: " + response.statusText);
      }
      const data = await response.json();
      const { lat, lng } = data.results[0].geometry;
      return { latitude: lat, longitude: lng };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to get coordinates for the city.");
    }
  }
  
  // Function to fetch weather data by city name
  async function fetchWeatherByCity(cityName) {
    try {
      // Step 1: Get coordinates for the city
      const { latitude, longitude } = await getCoordinates(cityName);
  
      // Step 2: Define the Open Meteo API with desired parameters
      const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,shortwave_radiation,evapotranspiration`;
  
      // Step 3: Fetch weather data
      const response = await fetch(weatherApiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data: " + response.statusText);
      }
  
      const data = await response.json();
      const hourlyData = data.hourly;
      console.log(data)
  
      // Step 4: Calculate averages for each parameter
      const avgTemperature = calculateAverage(hourlyData.temperature_2m);
      const avgPrecipitation = calculateAverage(hourlyData.precipitation);
      const avgShortwaveRadiation = calculateAverage(hourlyData.shortwave_radiation);
      const avgEvapotranspiration = calculateAverage(hourlyData.evapotranspiration);
  
      // Step 5: Log results
      console.log(`Weather data for ${cityName}:`);
      console.log("Average Temperature (°C):", avgTemperature.toFixed(2));
      console.log("Average Precipitation (mm):", avgPrecipitation.toFixed(2));
      console.log("Average Shortwave Radiation (W/m²):", avgShortwaveRadiation.toFixed(2));
      console.log("Average Evapotranspiration (mm):", avgEvapotranspiration.toFixed(2));
      let weatherData = [ avgTemperature.toFixed(2), avgPrecipitation.toFixed(2),avgShortwaveRadiation.toFixed(2), avgEvapotranspiration.toFixed(2)]
    } catch (error) {
      console.error("Error:", error);
    }
  }
  

  function calculateAverage(values) {
    const sum = values.reduce((acc, value) => acc + value, 0);
    return sum / values.length;
  }
  
//   fetchWeatherByCity("Okara");


  let  [ cityData , setCityData] = useState()



//   return <div className="tempTable section">
//     <table>
//         <thead>
//             <tr>
//             <th>City Name</th>
//             <th>Average Temperature (°C)</th>
//             <th>Average Precipitation (mm)</th>
//             <th>Average Shortwave Radiation (W/m²)</th>
//             <th>Average Evapotranspiration (mm)</th>
//             </tr>
//         </thead>

//         <tbody>

//                 {divShortName.map(  (item,index)=>{
//                      setCityData( fetchWeatherByCity(item))  
//                     return <tr key={index}>
//                         <td>{cityData[0]}</td>
//                         <td>{cityData[1]}</td>
//                         <td>{cityData[2]}</td>
//                         <td>{cityData[3]}</td>
//                     </tr>
//                 })}

//         </tbody>
//     </table>
//   </div>

}

export default TempratureTable