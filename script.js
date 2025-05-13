const cityInput = document.querySelector('#search');
const searchBtn = document.querySelector('#search-btn');
const weatherContainer = document.querySelector('#weather-container');
const errorMessage = document.querySelector('#error-message');

const cityName = document.querySelector('#city-name');
const weatherIcon = document.querySelector('#weather-icon');
const temperature = document.querySelector('#temperature');
const weatherDescription = document.querySelector('#weather-description');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');

searchBtn.addEventListener('click', searchWeather);
cityInput.addEventListener('keypress', (e) => {
   if (e.key === 'Enter') searchWeather();
});

function debounce(func, delay) {
   let timer;
   return function() {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, arguments), delay);
   };
}

function searchWeather() {
   const city = cityInput.value.trim();
   if (city) {
      fetchData(city);
   } else {
      showError('Please enter a city name');
   }
}
// Если использовать дебаунс, то кнопка Search перестает быть полезной, т.к  город ищется каждые 500 мс
// cityInput.addEventListener('input', debounce(function() {
//    const city = cityInput.value.trim(); 
//    if (city) {
//       fetchData(city);
//    }
// }, 500));

const apiKey = '23b3145a7ac02e89fcdd15276b39c0b6';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

function displayWeather(data) {
   cityName.textContent = `${data.name}, ${data.sys.country}`;
   temperature.textContent = `${Math.round(data.main.temp)}°C`;
   weatherDescription.textContent = `Weather: ${data.weather[0].description}`;
   humidity.textContent = `Humidity: ${data.main.humidity}%`;
   windSpeed.textContent = `Wind speed: ${data.wind.speed} m/s`;
      
   const iconCode = data.weather[0].icon;
   weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
   weatherIcon.alt = data.weather[0].description;
   
   weatherContainer.style.display = 'block';
   errorMessage.style.display = 'none';
}
function showError(message) {
   errorMessage.textContent = message;
   errorMessage.style.display = 'block';
}
async function fetchData(city) {
   try {
      const response = await axios.get(`${baseURL}?q=${city}&appid=${apiKey}&units=metric`);
      displayWeather(response.data);
   } catch (error) {
      showError('City not found. Please try another location.');
      console.error('Error:', error);
      weatherContainer.style.display = 'none';
   }
}

