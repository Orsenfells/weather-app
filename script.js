let apiKey = 'b9138dfaee9c9537cf889f71d76b8645' 
const searchInput = document.querySelector('#location-search-field')
const form = document.querySelector('form')
let getLocation = (location) => {
    return location
}

let getWeatherData = async (location) => {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
        let data = await response.json()

        return data
    } catch (error) {
        console.log(error)
    }
}
let convertKelvinToFahrenheit = (kelvinTemp) => {
    return ((kelvinTemp - 273.15) * 9/5 + 32).toFixed(0)
}
let processWeatherData = async (promise) => {
    let data = await promise;
    let city =  data.name;
    let temperature = convertKelvinToFahrenheit(data.main.temp);
    let country = data.sys.country;
    let weather = data.weather[0].main;
    let weatherDescription = data.weather[0].description;
    return {city, temperature, country, weather, weatherDescription }
}
let domController = (() => {
    let city = document.querySelector('.location')
    let weather = document.querySelector('.weather')
    let temperature = document.querySelector('.temp')
    let weatherDescription = document.querySelector('.weather-description')
    
    let clearWeatherReport = () => {
        city.textContent = '';
        weather.textContent = ''
        temperature.textContent = ''
        weatherDescription.textContent = ''
    }
    let updateWeatherReport = (data) => {
        city.textContent = `${data.city}, ${data.country}`
        weather.textContent = data.weather
        temperature.textContent = `${data.temperature}°`
        weatherDescription.textContent = data.weatherDescription
    }
    return { clearWeatherReport, updateWeatherReport }

})()
let handleWeatherDataSearch = async () => {
    let location = searchInput.value
    let response = await getWeatherData(location)
    let data = await processWeatherData(response)
    domController.updateWeatherReport(data)
}
form.addEventListener('submit', (e) => {
    e.preventDefault()
    handleWeatherDataSearch()
})
