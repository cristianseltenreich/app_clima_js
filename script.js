let urlBase = "https://api.openweathermap.org/data/2.5/weather";
let api_key = "9301c3879620c8912a2a0da112d5ea23";
let difKelvin = -273.15;

//let city = "Punta Alta";
//fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
//    .then(response => response.json())
//    .then(data => console.log(data));

document.getElementById("botonBusqueda").addEventListener("click", () => {
    let ciudad = document.getElementById("ciudadEntrada").value;
    //console.log(ciudad);
    if (ciudad) {
        fetchDatosClima(ciudad);
    }
});

function englishToSpanish(descripcion) {
    switch (descripcion) {
        case "clear sky":
            return "cielo despejado";
        case "overcast clouds":
            return "nublado";
        case "few clouds":
            return "pocas nubes";
        case "scattered clouds":
            return "nubes dispersas";
        case "broken clouds":
            return "nubes fragmentadas";
        case "shower rain":
            return "lluvia";
        case "rain":
            return "lluvia";
        case "thunderstorm":
            return "tormenta";
        case "snow":
            return "nieve";
        case "mist":
            return "neblina";
        case "fog":
            return "neblina";
        case "haze":
            return "neblina";
        case "smoke":
            return "humo";
        case "dust":
            return "polvo";
        case "sand":
            return "arena";
        case "ash":
            return "ceniza";
        case "squall":
            return "chubasco";
        case "tornado":
            return "tornado";
        case "light rain":
            return "lluvia ligera";
        default:
            return descripcion;
    }
}

function fetchDatosClima(ciudad) {
    fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`)
        .then(data => data.json())
        .then(data => { mostrarDatosClima(data) });
}

function direccionVientoACardinal(direccion) {
    if (direccion > 337.5 || direccion <= 22.5) {
        return "Norte";
    } else if (direccion > 22.5 && direccion <= 67.5) {
        return "Noreste";
    } else if (direccion > 67.5 && direccion <= 112.5) {
        return "Este";
    } else if (direccion > 112.5 && direccion <= 157.5) {
        return "Sureste";
    } else if (direccion > 157.5 && direccion <= 202.5) {
        return "Sur";
    } else if (direccion > 202.5 && direccion <= 247.5) {
        return "Suroeste";
    } else if (direccion > 247.5 && direccion <= 292.5) {
        return "Oeste";
    } else if (direccion > 292.5 && direccion <= 337.5) {
        return "Noroeste";
    }
}

let metroSegundoAKmHora = (velocidad) => velocidad * 3.6;

function mostrarDatosClima(data) {
    console.log(data);
    const divDatosClima = document.getElementById("datosClima");
    divDatosClima.innerHTML = "";//limpio el div

    let nombreCiudad = data.name;
    let pais = data.sys.country;
    let temperatura = data.main.temp + difKelvin;
    let humedad = data.main.humidity;
    let viento = data.wind.speed;
    let direccionViento = data.wind.deg;
    let descripcion = data.weather[0].description;
    let icon = data.weather[0].icon;

    descripcion = englishToSpanish(descripcion);



    let direccionVientoCardinal = direccionVientoACardinal(direccionViento);
    let vientoKmHora = metroSegundoAKmHora(viento);

    let ciudadTitulo = document.createElement("h2");
    ciudadTitulo.textContent = `${nombreCiudad} - ${pais}`;
    divDatosClima.appendChild(ciudadTitulo);

    let imgClima = document.createElement("img");
    imgClima.src = `http://openweathermap.org/img/w/${icon}.png`;
    divDatosClima.appendChild(imgClima);

    let temperaturaParrafo = document.createElement("p");
    temperaturaParrafo.textContent = `Temperatura: ${temperatura.toFixed(2)}°C`;
    divDatosClima.appendChild(temperaturaParrafo);

    let humedadParrafo = document.createElement("p");
    humedadParrafo.textContent = `Humedad: ${humedad}%`;
    divDatosClima.appendChild(humedadParrafo);

    let vientoParrafo = document.createElement("p");
    vientoParrafo.textContent = `Viento del ${direccionVientoCardinal} ${vientoKmHora.toFixed(2)} km/h`;
    divDatosClima.appendChild(vientoParrafo);

    let descripcionParrafo = document.createElement("p");
    descripcionParrafo.textContent = `Descripción meteorológica: ${descripcion}`;
    divDatosClima.appendChild(descripcionParrafo);    
}

