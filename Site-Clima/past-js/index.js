let lat
let lon
let dados
let cityname;
let cod
let DayOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","friday","Saturday"];

$(document.querySelectorAll(".dataWeather")).hide();


async function pegaCord(city,State,contry)
{
     await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${State},${contry}&limit=1&appid=6479388e7cc13f27ad7b24fe6fbb1454`)
    .then(async data =>  data.json())
    .catch(err=> alert("informe a cidade"))
    .then(async data => {
        console.log(data)
        lat =  data[0].lat;
        lon =  data[0].lon;
        cityname= data[0].name
    })
    .catch(err=> alert("informe a cidade"))
}

    async function pegarWeather()
    {
        await fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&APPID=6479388e7cc13f27ad7b24fe6fbb1454&units=metric&lang=pt_br&`)
        .then( data => data.json())
        .catch(err => alert("informe a cidade"))
        .then(data => dados = data)
        .catch(err=> alert("informe a cidade"))
    }

    function RetornarWeather()
    {
        var text;
        var img;
        var Day = new Date();
        Day = Day.getDay();

        dados.daily.forEach((item,index)=> {
            if(index<1)
            {
            img = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`
            text = `<p class="cityname">${cityname}</p>`+
            `<p class="temp">${Math.round(dados.current.temp)}°C</p>`+
            `<p class="descricao">${item.weather[0].description}</p>`+
            `<img class="icone" src=${img} alt="clima">`+
            `<p class="tempMax">Max:${Math.round(item.temp.max)}°C</p>`+
            `<p class="tempMin">Min:${Math.round(item.temp.min)}°C</p>`
            document.querySelectorAll(".dataWeather")[index].innerHTML = text
            }
            else{
                if(index<4)
                {
                    img = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`
                    text = `<p class="cityname">${DayOfWeek[Day+index]}</p>`+
                    `<p class="descricao">${item.weather[0].description}</p>`+
                    `<img class="icone" src=${img} alt="clima">`+
                    `<p class="tempMax">Max:${Math.round(item.temp.max)}°C</p>`+
                    `<p class="tempMin">Min:${Math.round(item.temp.min)}°C</p>`
                    document.querySelectorAll(".dataWeather")[index].innerHTML = text
                }
            }
        });
    }

    $(window).ready(()=>{
        $("#btnSearchId").click(async ()=>{
            var city = document.querySelector("#city").value;
            var state = document.querySelector("#state").value;
            var country = document.querySelector("#country").value;
            await pegaCord(city,state,country)
            await pegarWeather()
            RetornarWeather()
            for(var i=0;i<4;i++)
            {
                $(document.querySelectorAll(".dataWeather")[i]).show()
                document.querySelectorAll(".dataWeather")[i].style.cssText = "transition: 2s;opacity:0.8;"
            }
        })
    })

    let category = "AM";
    let day = new Date();
    let hour = new Date();  
    let min = new Date();
    hour = hour.getHours();
    min = min.getUTCMinutes();
    day = day.getDay();
    let text;
    if(hour>12)
    {
        category = "PM";
        hour -= 12;
    }
    if(min<10)
    {
        min = "0"+min
    }
    text = `<p class="time">${hour}:${min} ${category}</p>`+
           `<p class="date">${DayOfWeek[day]}</p>`

    document.querySelector(".dateTime").innerHTML = text;



