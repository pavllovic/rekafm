const Ticker = function(elem) {
  this.ticker = elem;
  this.trackItems = this.getAllTrackItems();
  this.lineWidth = this.getLineWidth();
  this.groupTrackWidth = this.getGroupTrackWidth();
  this.translation = 0;
  this.scrollPosition = 1;
  this.initialVelocity = -1;
  this.velocity = this.initialVelocity;
  // this.orientation = Math.sign(this.velocity);
  this.scroll = { y: 0 };
  this.rAF = null;
  this.paused = true;
};

Ticker.prototype = {
  init: function() {
    this.getLineWidth();
    this.getGroupTrackWidth();
    this.getVelocity();
    this.setTickerObserver();
    // this.animate();
    // this.scrollEvent();
    this.setListeners();
    console.log(this.velocity);
  },

  setListeners: function() {
    window.addEventListener('scroll', this);
  },

  getGroupTrackWidth: function() {
    const groupTrack = this.ticker.querySelector('[data-ticker="group-track"]');
    // return groupTrack.offsetWidth ;
    return groupTrack.getBoundingClientRect().width;
  },

  getLineWidth: function() {
    const line = this.ticker.querySelector('[data-ticker="line"]');
    // return line.offsetWidth;
    return line.getBoundingClientRect().width;
  },

  getAllTrackItems: function() {
    return this.ticker.querySelectorAll('.track-item');
  },

  getVelocity: function() {
    const velocity = this.ticker.getAttribute('data-ticker-velocity');
    this.velocity = velocity * -1;
    this.initialVelocity = velocity * -1;
  },

  getTranslation: function() {
    const translation = this.translation > 0
      ? -this.groupTrackWidth + (this.translation % this.groupTrackWidth)
      : this.translation += this.velocity;
    return translation;
  },

  animate: function() {
    if((this.translation > this.lineWidth / 2) || (this.translation < -this.lineWidth / 2)) {
      this.translation = 0;
    } else {
      this.translation += this.velocity;
    }

    const translation = Math.round(this.getTranslation());

    this.trackItems.forEach((item) => {
      const elem = item;
      const isInverse = elem.hasAttribute('data-ticker-inverse');
      isInverse ? elem.style = `transform: translateX(${translation * -1}px)`
        : elem.style = `transform: translateX(${translation}px)`;
    });

    if(!this.paused) this.rAF = requestAnimationFrame(() => this.animate());
  },

  pauseAnimate: function() {
    this.paused = true;
  },

  resumeAnimate: function() {
    this.paused = false;
    this.rAf = requestAnimationFrame(() => this.animate());
  },

  setTickerObserver: function() {
    const tickerParent = this.ticker.parentElement;
    const callback = (entries) => {
      entries.forEach((entry) => {
        entry.isIntersecting ? this.resumeAnimate() : this.pauseAnimate();
      });
    };
    this.observer = new IntersectionObserver(callback);
    this.observer.observe(tickerParent);
  },

  scrollEvent: function() {
    if(this.paused) return;
    let isScrolling;
    window.clearTimeout(isScrolling);
    const scrollY = Math.round(this.scroll.y) ? Math.round(this.scroll.y) : 0;
    const newScrollPosition = scrollY - this.scrollPosition;
    this.scrollPosition = scrollY;
    if(newScrollPosition !== 0) {
      const newVelocity = this.initialVelocity * newScrollPosition;
      this.velocity = newVelocity;
    }
    const direction = Math.sign(this.velocity);
    this.scroll.y = window.pageYOffset;
    isScrolling = setTimeout(() => {
      this.velocity = this.initialVelocity * -direction;
      // this.velocity = this.initialVelocity;
    }, 66);
  },

  handleEvent: function(e) {
    switch(e.type) {
      case 'scroll':
        this.scrollEvent();
        break;
      default:
        break;
    }
    return undefined;
  },
};

export default Ticker;
