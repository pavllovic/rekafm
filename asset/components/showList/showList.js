import * as lib from 'Lib/showList/showList.js';

const ShowList = lib.showList;

ShowList.prototype = {
  constructor: ShowList,
  init: lib.init,
  setListeners: lib.setListeners,
  openList: lib.openList,
  closeList: lib.closeList,
  toggleList: lib.toggleList,
  getInitalHeightInnerList: lib.getInitalHeightInnerList,
  handleEvent: lib.handleEvent,
};

export default ShowList;
