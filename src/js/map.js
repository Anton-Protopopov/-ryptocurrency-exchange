import { el, setChildren } from "redom";
import { createHeader } from "./header.js";
let token = JSON.parse(localStorage.getItem("myKey"));

const headerBody = createHeader();
setChildren(document.querySelector('header'), headerBody.header);
document.querySelector('#map1').classList.add('btn-active');
const mapATM = () => {

  const container = el('div.map__container.container');
  const mapTitle = el('h2.title.cardInfo__title', 'Карта банкоматов');
  const map = el('div#map', { style: 'height: 730px' });

  setChildren(container, [mapTitle, map]);

  ymaps.ready(init);

  function init() {
    var myMap = new ymaps.Map('map', {
      center: [55.76, 37.64],
      zoom: 10
    }, {
      searchControlProvider: 'yandex#search'
    })


    const getPlacemarks = async () => {
      await fetch(`http://localhost:3000/banks`, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${token}`
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.payload);
          data.payload.forEach(elem => {
            let myGeoObject = new ymaps.GeoObject({
              geometry: {
                type: "Point",
                coordinates: [elem.lat, elem.lon]
              },
            })
            myMap.geoObjects.add(myGeoObject);
          })
        });
    }
    getPlacemarks()

  }
  return container
}

setChildren(document.querySelector('main'), mapATM());
