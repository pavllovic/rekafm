const Map = function(id, zoom, center) {
  this.center = center;
  this.id = id;
  this.zoom = zoom;
};

Map.prototype = {
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
  },

  createIconLayout: function() {
    window.ymaps.ready(() => {
      const IconLayout = window.ymaps.templateLayoutFactory.createClass( // eslint-disable-line
        '<div class="placemark"><img src="../asset/images/build/{{ properties.objectData.id }}/thumb/1.jpg"></div>',
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
            coordinates: [25, 25],
            radius: 25,
          },
          href: './index.html',
        },
      ));
    });
  },

  addObjectsInObjectCollection: function(objects) {
    objects.forEach((object) => {
      this.addObjectInObjectCollection(object);
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
    });
  },

  updateCenterMap: function(coords, zoom) {
    window.ymaps.ready(() => {
      this.map.setCenter(coords, zoom, 'yandex#map');
    });
  },
};

export default Map;
