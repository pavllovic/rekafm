const YMap = function(id, options) {
  this.center = options.center;
  this.id = id;
  this.zoom = options.zoom;
};

// function setBalloonPane (map, placemark, mapData) {
//   const data = mapData || {
//     globalPixelCenter: map.getGlobalPixelCenter(),
//     zoom: map.getZoom(),
//   };

//   const mapSize = map.container.getSize();
//   const mapBounds = [ // eslint-disable-line
//       [
//         data.globalPixelCenter[0] - mapSize[0] / 2,
//         data.globalPixelCenter[1] - mapSize[1] / 2,
//       ],
//       [
//         data.globalPixelCenter[0] + mapSize[0] / 2,
//         data.globalPixelCenter[1] + mapSize[1] / 2,
//       ],
//     ],
//     balloonPosition = placemark.balloon.getPosition(),
//     zoomFactor = Math.pow(2, data.zoom - map.getZoom()), // eslint-disable-line
//     pointInBounds = window.ymaps.util.pixelBounds.containsPoint(mapBounds, [
//       balloonPosition[0] * zoomFactor,
//       balloonPosition[1] * zoomFactor,
//     ]),
//     isInOutersPane = placemark.options.get('balloonPane') === 'outerBalloon';

//   if (!pointInBounds && isInOutersPane) {
//     placemark.options.set({
//       balloonPane: 'balloon',
//       balloonShadowPane: 'shadows',
//     });
//   } else if (pointInBounds && !isInOutersPane) {
//     placemark.options.set({
//       balloonPane: 'outerBalloon',
//       balloonShadowPane: 'outerBalloon',
//     });
//   }
// }

// function observeEvents (map) {
//   let mapEventsGroup = null;
//   map.geoObjects.each((geoObject) => {
//     geoObject.balloon.events
//       // При открытии балуна начинаем слушать изменение центра карты.
//       .add('open', (e1) => {
//         const placemark = e1.get('target');
//         // Вызываем функцию в двух случаях:
//         mapEventsGroup = map.events.group()
//           // 1) в начале движения (если балун во внешнем контейнере);
//           .add('actiontick', (e2) => {
//             if (placemark.options.get('balloonPane') === 'outerBalloon') {
//               setBalloonPane(map, placemark, e2.get('tick'));
//             }
//           })
//           // 2) в конце движения (если балун во внутреннем контейнере).
//           .add('actiontickcomplete', (e2) => {
//             if (placemark.options.get('balloonPane') !== 'outerBalloon') {
//               setBalloonPane(map, placemark, e2.get('tick'));
//             }
//           });
//         // Вызываем функцию сразу после открытия.
//         setBalloonPane(map, placemark);
//       })
//       // При закрытии балуна удаляем слушатели.
//       .add('close', () => {
//         mapEventsGroup.removeAll();
//       });
//   });
// }

YMap.prototype = {
  init: function() {
    window.ymaps.ready(() => {
      this.map = new window.ymaps.Map(this.id, {
        center: this.center,
        zoom: this.zoom,
        controls: [],
      }, {
        suppressMapOpenBlock: true,
      });
    });

    window.ymaps.ready(() => {
      const mapCenter = this.map.container.getMapSize()[1] / 2;
      this.map.controls.add('geolocationControl', {
        position: {
          top: `calc(${mapCenter}px - 47px)`,
          right: '1em',
        },
      });
      this.map.controls.add('zoomControl', {
        size: 'small',
        position: {
          top: `calc(${mapCenter}px - 14px)`,
          right: '1em',
        },
      });
    });

    // window.ymaps.ready(() => {
    //   observeEvents(this.map);
    // });
  },

  createIconLayout: function() {
    window.ymaps.ready(() => {
      const IconLayout = window.ymaps.templateLayoutFactory.createClass( // eslint-disable-line
        '<div class="placemark"><img src="{{ properties.objectData.thumbUrl }}"></div>',
        {
          build: function () {
            IconLayout.superclass.build.call(this);
            this.getData().geoObject.events.add('mouseenter', () => {
              this.getParentElement().querySelector('.placemark').classList.add('is-hover');
            });
            this.getData().geoObject.events.add('mouseleave', () => {
              this.getParentElement().querySelector('.placemark').classList.remove('is-hover');
            });
          },
        },
      );
      this.iconLayout = IconLayout;
    });
  },

  createStaticPointLayout: function() {
    window.ymaps.ready(() => {
      const StaticPointLayout = window.ymaps.templateLayoutFactory.createClass( // eslint-disable-line
        '<div class="placepoint"><svg class="icon" focusable="false"><use href="#icon-16-see"/></svg></div>',
      );
      this.StaticPointLayout = StaticPointLayout;
    });
  },

  createBalloonLayout: function() {
    window.ymaps.ready(() => {
      const BalloonLayout =  window.ymaps.templateLayoutFactory.createClass( // eslint-disable-line
        `<div class="balloon">
          <h3 class="title">«{{ properties.objectData.name }}»</h3>
          <p class="address">{{ properties.objectData.address }}</p>
          <div class="meta">
            <!-- hidden attribute controls visibility param (boolean, not string) -->
            <span data-build-state="booked">
              <span>Забронировно</span>
            </span>
            <span data-build-price>
              <span>{{ properties.objectData.meta.price }}</span> &nbsp;млн руб
            </span>
            <span data-build-type>
              <span>{{ properties.objectData.meta.type }}</span>
            </span>
            <span data-build-size>
              <span class="prefix-rent">от&nbsp;</span> <span>{{ properties.objectData.meta.size }}</span> &nbsp;м²
            </span>
          </div>
          <div class="badge-list">
            {% for badge in properties.objectData.badges %}
              <span class="badge">{{ badge }}</span>
            {% endfor %}
          </div>
        </div>`,
      );
      this.balloonLayout = BalloonLayout;
    });
  },

  createObjectCollection: function() {
    window.ymaps.ready(() => {
      this.objectCollection = new window.ymaps.GeoObjectCollection();
      this.objectCollection.events.add('click', (e) => {
        location = e.get('target').options.get('href'); // eslint-disable-line
      });
      this.objectCollection.events.add('mouseenter', (e) => {
        e.get('target').balloon.open();
        e.get('target').balloon.autoPan();
      });

      this.objectCollection.events.add('mouseleave', (e) => {
        e.get('target').balloon.close();
      });
      this.map.geoObjects.add(this.objectCollection);
    });
  },

  clearObjectCollection: function() {
    this.objectCollection.removeAll();
  },

  addObjectInObjectCollection: function(objectData) {
    window.ymaps.ready(() => {
      this.objectCollection.add(new window.ymaps.Placemark(
        objectData.coords,
        {
          objectData: objectData,
        },
        {
          hideIconOnBalloonOpen: false,
          iconLayout: this.iconLayout,
          balloonLayout: this.balloonLayout,
          // balloonOffset: [0, -200],
          iconShape: {
            type: 'Circle',
            coordinates: [35, 35],
            radius: 35,
          },
          href: objectData.link,
        },
      ));
    });
  },

  addObjectsInObjectCollection: function(objects) {
    objects.forEach((object, index) => {
      this.addObjectInObjectCollection(object);
      if(index === objects.length - 1) {
        window.ymaps.ready(() => {
          this.map.setBounds(this.map.geoObjects.getBounds(), {
            checkZoomRange: true,
            zoomMargin: 70,
          });
        });
      }
    });
  },

  addStaticPointOnMap: function(objectData) {
    window.ymaps.ready(() => {
      const point = new window.ymaps.Placemark(
        objectData.coords,
        {},
        {
          hideIconOnBalloonOpen: false,
          iconLayout: this.StaticPointLayout,
        },
      );
      this.map.geoObjects.add(point);
      this.map.setCenter(objectData.coords, 17);
    });
  },

  updateCenterMap: function(coords, zoom) {
    window.ymaps.ready(() => {
      this.map.setCenter(coords, zoom, 'yandex#map');
    });
  },

  // setMapCenter: function() {
  //   this.map.setBounds(this.map.geoObjects.getBounds());
  // },
};

export default YMap;
