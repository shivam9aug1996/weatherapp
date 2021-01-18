const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const temp=document.getElementById("temp_real_val");
const min=document.getElementById("min")

const getInfo = async(event) => {
    event.preventDefault();

    let cityVal = cityName.value;

   

      
           

            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=b14425a6554d189a2d7dc18a8e7d7263`
            const response = await fetch(url);

            const data = await response.json();
            const arrData = [data];
            const weatherDescription=arrData[0].weather[0].description;
           const weather= weatherDescription.charAt(0).toUpperCase()+weatherDescription.substring(1);
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp.innerText = `${Math.round(arrData[0].main.temp)}°C , ${weather}`;
            min.innerText=`Min ${Math.round(arrData[0].main.temp_min)} °C | Max ${Math.round(arrData[0].main.temp_max)} °C `;
          

           
           
       
       
        
    
}

submitBtn.addEventListener('click', getInfo);