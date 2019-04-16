const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');
let latLng
let marker;
let markerLayer;

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageTwo.textContent = `${data.error}`;
            } else {
                if (markerLayer == undefined) {
                    latLng = L.latLng(`${data.latitude}`, `${data.longitude}`);
                    messageOne.textContent = `${data.location}`;
                    messageTwo.textContent = `${data.forecast}`;
                    marker = L.marker(latLng);
                    markerLayer = L.layerGroup([marker]).addTo(map)
                    map.flyTo(latLng, 13, {
                        duration: 1.5
                    });
                } else {
                    map.removeLayer(markerLayer);
                    latLng = L.latLng(`${data.latitude}`, `${data.longitude}`);
                    messageOne.textContent = `${data.location}`;
                    messageTwo.textContent = `${data.forecast}`;
                    marker = L.marker(latLng);
                    markerLayer = L.layerGroup([marker]).addTo(map)
                    map.flyTo(latLng, 13, {
                        duration: 1.5
                    });
                }


            }
        });
    });
})

var map = L.map('mapid').setView([0, 0], 1);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoiam5jMDkiLCJhIjoiY2p0ZHVhcjRoMWI5ZzQ2c3pqY3kzd2xmbSJ9.-ZHjLWwfQxLUa4gq0rwpyg'
}).addTo(map);

