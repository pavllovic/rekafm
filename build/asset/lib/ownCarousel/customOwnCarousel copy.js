export const customOwnCarousel = function(elem, options) {
  this.options = {
    itemPerRow: 4,
    itemWidth: 24,
    loop: true,
    responsive: {},
    draggable: true,
    mouseWheel: false,
    autoplay: 0,
    stopAutoplayWhenHover: true,
    nav: false,
    ...options,
  };
  this.wrap = elem;
  this.carousel = elem.querySelector('.own-carousel');
  this.picker = elem.querySelector('.own-carousel__picker');
  this.tabs = elem.querySelector('.own-carousel__tabs');
  this.carouselOuter = elem.querySelector('.own-carousel__outer');
  this.gallery = document.querySelector('.js-gallery');
  this.itemWidth = this.options.itemWidth;
  this.itemWidthBig = this.options.itemWidth;
  this.itemPerRow = this.options.itemPerRow;
  this.itemPerRowBig = this.options.itemPerRow;
  this.responsive = this.options.responsive;
  this.gapWidth = (100 - this.options.itemPerRow
    * this.options.itemWidth) / (this.options.itemPerRow - 1)
    || 0; // prevent divide 0
  this.wrap.style.setProperty('--width', `${this.options.itemWidth}%`);
  this.wrap.style.setProperty('--margin', `${this.gapWidth}%`);
  this.index = 0;
  this.carouselItem = this.carousel.children;
  this.imgWidth = this.carouselItem[0].getBoundingClientRect().width;
  this.numberOfItem = this.carouselItem.length;
  this.step = this.imgWidth + (this.gapWidth / this.itemWidth)
    * this.imgWidth; // calculate the step to translate
  this.btnClose = this.wrap.querySelector('[data-gallery="close"]');
  this.btnOpen = this.wrap.querySelector('[data-gallery="open"]');
};

export const init = function() {
  this.setListeners();
  this.createPickers();
  this.createTabsMap();
  this.activeThumb = this.tabs.querySelector('[data-gallery="tab"]');
};

export const createTabsMap = function() {
  this.tabsMap = new Map();
  this.tabs.querySelectorAll('[data-gallery="tab"]').forEach((item, i) => {
    this.tabsMap.set(item, i);
  });
};

export const createPickers = function() {
  this.pickerItems = [];
  for(let i = 0; i < this.numberOfItem / this.itemPerRow; i += 1) {
    const elem = document.createElement('span');
    elem.classList.add('item');
    this.pickerItems.push(elem);
    this.picker.appendChild(elem);
  }
  this.activePickerItem = this.pickerItems[0];
  this.pickerItems[0].classList.add('active');
};

export const setListeners = function() {
  if (this.options.loop) {
    // if loop is true, clone carousel item
    this.index = this.itemPerRow;
    this.carousel.style.transform = `translate3d(${
      -this.index * this.step
    }px,0,0)`;
    for (let i = 0; i < this.itemPerRow; i += 1) {
      const cloneNode = this.carouselItem[i].cloneNode(true);
      this.carousel.insertAdjacentElement('beforeend', cloneNode);
    }
    let count = 0;
    while (count !== this.itemPerRow) {
      const cloneNode = this.carouselItem[this.numberOfItem - 1].cloneNode(
        true,
      );
      this.carousel.insertAdjacentElement('afterbegin', cloneNode);
      count += 1;
    }
  }

  let intervalId;
  let timeoutId;

  if(this.options.autoplay) {
    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => this.moveSlide(1), this.options.autoplay);
    }, 3000);
    if (this.options.stopAutoplayWhenHover) {
      this.carouselOuter.addEventListener('mouseenter', () => {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
      });
      this.carouselOuter.addEventListener('mouseleave', () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          intervalId = setInterval(() => this.moveSlide(1), this.options.autoplay);
        }, 2000);
      });
    }
  }

  if (this.options.nav) {
    this.wrap.querySelector('.control__prev').addEventListener('click', () => {
      this.moveSlide(-1);
    });
    this.wrap.querySelector('.control__next').addEventListener('click', () => {
      this.moveSlide(1);
    });
  }

  if (this.options.mouseWheel) {
    this.carouselOuter.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (e.deltaY > 0) this.moveSlide(-1);
      else this.moveSlide(1);
    });
  }

  if (this.options.draggable) {
    // if draggable is true, add draggable-support event, variables,...
    let currentPos = 0;
    let firstPos = currentPos;

    const dragHandle = (e) => {
      const currentMove = parseFloat(
        this.carousel.style.transform.slice(12),
      ); // get the x-axis of transform3d
      const currentIndex = -currentMove / this.step;

      const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX; // get current coordinate
      const distanceMoved = x - currentPos;
      if (this.options.loop) {
        if (currentIndex <= 0) {
          this.index = this.numberOfItem;
          this.translateSlide();
        } else if (currentIndex >= this.numberOfItem + this.itemPerRow) {
          this.index = this.itemPerRow;
          this.translateSlide();
        } else {
          this.carousel.style.transform = `translate3d(${
            currentMove + distanceMoved
          }px,0,0)`;
        }
      } else {
        (currentIndex < 0 || currentIndex > this.numberOfItem - this.itemPerRow)
          ? this.carousel.style.transform = `translate3d(${currentMove + distanceMoved / 5}px,0,0)`
          : this.carousel.style.transform = `translate3d(${currentMove + distanceMoved}px,0,0)`;
      }
      currentPos = x;
    };

    const dragEndHandle = (e) => {
      if (e.type === 'touchend') {
        document.removeEventListener('touchmove', dragHandle);
        document.removeEventListener('touchend', dragEndHandle);
      } else {
        document.removeEventListener('mousemove', dragHandle);
        document.removeEventListener('mouseup', dragEndHandle);
        this.carouselOuter.style.cursor = 'auto';
      }
      // remove unnecessary event listener and style
      const currentMove = parseFloat(
        this.carousel.style.transform.slice(12),
      );
      this.index = this.checkIndex(-currentMove);
      if (!this.options.loop) {
        if (this.index > this.numberOfItem - this.itemPerRow) {
          this.index = this.numberOfItem - this.itemPerRow;
        }
        if (this.index < 0) this.index = 0;
      }
      this.carousel.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
      this.translateSlide();
      if (this.options.autoplay) {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          intervalId = setInterval(() => this.moveSlide(), this.options.autoplay, 1);
        }, 2000);
      }
    };

    const dragStartHandle = (e) => {
      this.carousel.style.transition = 'none';
      if (e.type === 'touchstart') {
        currentPos = e.touches[0].clientX;
        document.addEventListener('touchmove', dragHandle);
        document.addEventListener('touchend', dragEndHandle);
      } else {
        this.carouselOuter.style.cursor = 'grab';
        currentPos = e.clientX;
        document.addEventListener('mousemove', dragHandle);
        document.addEventListener('mouseup', dragEndHandle);
      }
      firstPos = currentPos;
      // add necessary listener, style, reset first and current position
      if (this.options.autoplay) {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      }
    };

    this.checkIndex = (currentMove) => {
      let temp = currentMove;
      while (temp >= this.step) {
        temp -= this.step;
      }
      if (
        (temp > 50 && firstPos - currentPos >= 0)
        || (this.step - temp < 50 && firstPos - currentPos <= 0)
      ) return Math.ceil(currentMove / this.step);
      return Math.floor(currentMove / this.step);
    }; // this function is used to check current index to determine move next or previous

    this.carouselOuter.addEventListener('mousedown', dragStartHandle);
    this.carouselOuter.addEventListener('touchstart', dragStartHandle);
    // i had to create carouselOuter because carousel will be hidden when slide is working
  }

  window.addEventListener('resize', this.debounce(() => this.adaptive(), 500));

  if(this.btnClose) {
    this.btnClose.addEventListener('click', () => this.closeGallery());
  }

  if(this.btnOpen) {
    this.btnOpen.addEventListener('click', () => this.openGallery());
  }

  if(this.gallery) {
    this.initialWidthGallery = this.gallery.offsetWidth;
    this.gallery.style.setProperty('--g-width', this.initialWidthGallery);
  }

  if(this.tabs) {
    this.tabs.addEventListener('click', (e) => {
      if(e.target.getAttribute('data-gallery') === 'tab') this.activateSlide(e.target);
    });
  }
};

export const openGallery = function() {
  this.gallery.style.setProperty('--g-width', window.screen.width);
  document.body.classList.add('open-gallery');
  this.step = window.screen.width;
  setTimeout(() => {
    this.moveSlide(0);
  }, 600);
};

export const closeGallery = function() {
  this.gallery.style.setProperty('--g-width', this.initialWidthGallery);
  this.gallery.classList.add('close');
  document.body.classList.remove('open-gallery');
  setTimeout(() => {
    this.gallery.classList.remove('close');
    this.step = this.imgWidth + (this.gapWidth / this.itemWidth)
      * this.imgWidth;
    this.moveSlide(0);
  }, 600);
  window.scrollTo({ top: 0, behavior: 'instant' });
};

export const translateSlide = function() {
  this.carousel.style.transform = `translate3d(${
    -this.index * this.step
  }px,0,0)`;
  this.updateActivePicker();
};

export const updateActivePicker = function() {
  let num = this.index - 1;
  if(this.index === 0) num = this.numberOfItem - 1;
  if(this.index > this.numberOfItem) num = 0;
  this.activePickerItem.classList.remove('active');
  this.pickerItems[num].classList.add('active');
  this.activePickerItem = this.pickerItems[num];
};

export const activateSlide = function(target) {
  const num = this.tabsMap.get(target);
  this.activeThumb.classList.remove('active');
  target.classList.add('active');
  this.activeThumb = target;
  this.index = num + 1;
  this.translateSlide();
};

export const resetSlide = function(step) {
  // reset slide, to make it loop
  if (this.index + step < 1) this.index = this.numberOfItem + 1;
  if (this.index + step >= this.numberOfItem + this.itemPerRow) {
    this.index = this.itemPerRow - 1;
  }
  this.carousel.style.transition = 'none';
  this.translateSlide();
  // reset it silently by changing transition to none
  // then move it, i had delay 20ms because if we change inline style transition too fast,
  // it will not work properly
  setTimeout(() => {
    this.carousel.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
    this.index += step;
    this.translateSlide();
  }, 20);
};

export const moveSlide = function(step) {
  this.carousel.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
  // every time we move slide, add transition
  if (this.options.loop) {
    if (
      this.index + step < 1 || this.index + step >= this.numberOfItem + this.itemPerRow
    ) {
      this.resetSlide(step);
    } else {
      this.index += step;
      this.translateSlide();
    }
  } else {
    if (
      this.index + step < 0 || this.index + step > this.numberOfItem - this.itemPerRow
    ) return;
    this.index += step;
    this.translateSlide();
  }
};

export const debounce = function(fn, delay) {
  let id = null;
  return function (args) {
    clearTimeout(id);
    id = null;
    id = setTimeout(function () {
      fn.call(this, args);
    }, delay);
  };
};

export const updateSize = function() {
  this.step = this.imgWidth + (this.gapWidth / this.itemWidth)
    * this.imgWidth;
};

export const adaptive = function() {
  const windowWidth = window.innerWidth;
  let flag = false;
  for (const property in this.options.responsive) { //eslint-disable-line
    if (property >= windowWidth) {
      this.itemPerRow = this.options.responsive[property][0];
      this.itemWidth = this.options.responsive[property][1];
      flag = true;
      break;
    }
  }
  if (!flag) {
    // all property are smaller the window width, happen when we increase window width,
    // reset these property to highest value
    this.itemPerRow = this.itemPerRowBig;
    this.itemWidth = this.itemWidthBig;
  }
  this.gapWidth = (100 - this.itemPerRow * this.itemWidth)
    / (this.itemPerRow - 1) || 0;
  if(this.gallery) this.gallery.style.setProperty('--g-width', `${this.itemWidth}%`);
  this.wrap.style.setProperty('--width', `${this.itemWidth}%`);
  this.wrap.style.setProperty('--margin', `${this.gapWidth}%`);
  // divide into 2 phase to avoid wrong calculating for imgWidth
  this.imgWidth = this.carouselItem[0].getBoundingClientRect().width;
  this.step = this.imgWidth + (this.gapWidth / this.itemWidth)
    * this.imgWidth;
  // change important property for responsive
  this.moveSlide(0);
};
