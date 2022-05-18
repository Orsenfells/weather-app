let apiKey = 'b9138dfaee9c9537cf889f71d76b8645' 
let getLocation = (location) => {
    return location
}

let getWeatherData = async (location) => {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
        let data = await response.json()
  console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}
let processWeatherData = async (promise) => {
    let data = await promise;
    let city =  data.name;
    let temperature = data.main.temp;
    let country = data.sys.country;
    let weather = data.weather[0].main;
    let weatherDescription = data.weather[0].description;
    return {city, temperature, country, weather, weatherDescription }
}