function getw() {
  let apiKey = '76c35f40ccaa25b0e739bc732c1c9bb3';
  let city = document.querySelector('input').value;
  console.log(city)
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  console.log(apiUrl);
  fetch(apiUrl)
  .then(res=>{
    if(!res.ok)
      throw new Error(`Status code ${res.status}`);
    res.json().then(data=>{
      console.log(data);
      const temp=document.querySelector('.temp');
      document.querySelector('.real_feel').innerHTML=`${parseInt(data.main.feels_like) - 273}°C`;
      temp.innerHTML=`${parseInt(data.main.temp) - 273}°C`
      document.querySelector('.wind_speed').innerHTML=`${parseInt(data.wind.speed)} km/h`
      document.querySelector('.city').innerHTML=data.name;
      document.querySelector('.humidity').innerHTML=`${data.main.humidity} %`;
      document.querySelector('.pressure').innerHTML=`${data.main.pressure} mb`;
      document.querySelector('.description').innerHTML=data.weather[0].main
      document.querySelector('.image').src=`icon/${data.weather[0].icon}@2x.png`;
      document.querySelector('.hi').innerHTML=`High: ${parseInt(data.main.temp_max) - 273}°C`
      document.querySelector('.lo').innerHTML=`Low: ${parseInt(data.main.temp_min) - 273}°C`
      // document.querySelector('.rain').innerHTML=`${parseInt(data.rain.1h) * 100}%`;
      // console.log(data.rain[0]);
      time_data(city);
    })
  })
  .catch(err=>{
    console.log(err+" is the error");
  })
}

document.querySelector('input').addEventListener('keypress',e=>{
  if (e.key=="Enter")
    getw();
})
function time_data(city) {
  var key='f01246e2649e41eb92ee882a810a0bd0';
  var url = `https://api.ipgeolocation.io/timezone?apiKey=${key}&location=${city}`;
  fetch(url)
  .then(res=>{
    if(!res.ok)
      throw new Error (`Status code ${res.status}`);
    res.json().then(data=>{
      console.log(data);
      document.querySelector('.time').innerHTML=data.time_12;
    })
  })
  .catch(err=>{
    console.log(err+" is the error");
  })
}