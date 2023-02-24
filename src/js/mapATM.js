import { el, setChildren } from "redom";

export const mapATM = (data) => {
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
          Authorization: `Basic ${data}`
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.payload);
          data.payload.forEach(elem =>{
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
