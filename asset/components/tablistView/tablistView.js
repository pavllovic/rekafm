import * as lib from 'Lib/tabs/tabs.js';

const TablistView = function (elem) {
  this.tablist = elem;
};

TablistView.prototype = {
  constructor: TablistView,
  init: lib.init,
  setListeners: lib.setListeners,
  deactivateTab: lib.deactivateTab,
  focusTab: lib.focusTab,
  handleEvent: lib.handleEvent,
  onkeydown: lib.onkeydown,
  activateTab: function(tab) {
    if(this.activeTab) this.deactivateTab(this.activeTab);
    tab.setAttribute('tabindex', '0');
    tab.setAttribute('aria-selected', true);
    tab.classList.add('active');
    const panelId = tab.getAttribute('aria-controls');
    const panel = document.querySelector(`#${panelId}`);
    this.showPanel(panel);
    this.activeTab = tab;
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
