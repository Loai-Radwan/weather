

let input = document.getElementById('city'), 
    button = document.getElementById('search'), 
    weather = document.getElementById('weather')

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
}
else{
}
button.onclick = () => {
    if(input.value.trim() == ''){
        weather.innerHTML = '<p>Please Enter a City  </p>'
    }
    else{
        console.log(input.value.toLowerCase())
        fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=5e17c91851e88379060dabbfb07089dc&units=metric`)
    }
}

function success(position) {
    console.log(`done ${position.coords.latitude}`)
    console.log(`done ${position.coords.longitude}`)
    fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=5e17c91851e88379060dabbfb07089dc&units=metric`)
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}


function fetchWeather(url){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.message){
        weather.innerHTML = `<p>${data.message}</p>`
        }
        else{
            weather.innerHTML = ''
            let cityName = document.createElement('h2')
            let temp = document.createElement('p')
            let cond = document.createElement('p')
    
    
            cityName.textContent = data.name
            temp.innerHTML = `Temperature : <span>${ Math.floor(data.main.temp)}</span>°C`
            cond.textContent = `Condition : <span>${data.weather[0].main}</span>`
    
            weather.appendChild(cityName)
            weather.appendChild(temp)
            weather.appendChild(cond)
        }
    })



}



