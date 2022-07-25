import * as lib from 'Lib/tabs/tabs.js';

const TablistView = function (elem) {
  this.tablist = elem;
  this.scrollY = 0;
};

TablistView.prototype = {
  constructor: TablistView,
  init: lib.init,
  setListeners: function() {
    lib.setListeners.call(this);
    // for backend
    document.addEventListener('mapTabOpened', () => {});
  },
  deactivateTab: lib.deactivateTab,
  focusTab: lib.focusTab,
  handleEvent: function(e) {
    switch(e.type) {
      case 'click':
        // for backend
        dispatchEvent(new Event('mapTabOpened'));
        break;
      default:
        break;
    }
    lib.handleEvent.call(this, e);
  },
  onkeydown: lib.onkeydown,
  activateTab: function(tab) {
    if(this.activeTab) this.deactivateTab(this.activeTab);
    tab.setAttribute('tabindex', '0');
    tab.setAttribute('aria-selected', true);
    tab.classList.add('active');
    const panelId = tab.getAttribute('aria-controls');
    console.log(panelId);
    const panel = document.querySelector(`#${panelId}`);
    this.showPanel(panel);
    this.activeTab = tab;
    panelId === 'panel-map'
      ? this.scrollY = window.scrollY
      : window.scrollTo({ top: this.scrollY });
  },
  showPanel: function(panel) {
    if(this.activePanel) this.hidePanel();
    panel.setAttribute('tabindex', '0');
    panel.classList.add('active');
    this.activePanel = panel;
    this.setStateFilterBar();
  },
  hidePanel: function() {
    this.activePanel.setAttribute('tabindex', '-1');
    this.activePanel.classList.remove('active');
  },
  getFilterBar: function() {
    this.filterBar = document.querySelector('.panellistFilter .active .filter-bottom');
  },
  hideFilterBar: function() {
    setTimeout(() => {
      this.filterBar.classList.remove('fixed');
    }, 1000);
  },
  showFilterBar: function() {
    setTimeout(() => {
      this.filterBar.classList.add('fixed');
    }, 1000);
  },
  setStateFilterBar: function() {
    this.getFilterBar();
    this.activePanel.getAttribute('aria-labelledby') === 'tab-map'
      ? this.showFilterBar()
      : this.hideFilterBar();
  },
};

export default TablistView;
