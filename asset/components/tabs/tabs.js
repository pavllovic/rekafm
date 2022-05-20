import * as lib from 'Lib/tabs/tabs.js';

const Tabs = lib.tabs;

Tabs.prototype = {
  constructor: Tabs,
  init: lib.init,
  setListeners: lib.setListeners,
  activateTab: lib.activateTab,
  deactivateTab: lib.deactivateTab,
  showPanel: lib.showPanel,
  hidePanel: lib.hidePanel,
  focusTab: lib.focusTab,
  handleEvent: lib.handleEvent,
  onkeydown: lib.onkeydown,
  getPanelsId: lib.getPanelsId,
  setHeightPanellist: lib.setHeightPanellist,
};

export default Tabs;
