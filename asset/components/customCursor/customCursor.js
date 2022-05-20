import * as lib from 'Lib/customCursor/customCursor';

const CustomCursor = lib.customCursor;

CustomCursor.prototype = {
  constructor: CustomCursor,
  init: lib.init,
  setListeners: lib.setListeners,
  translateCursor: lib.translateCursor,
  removeMouseMove: lib.removeMouseMove,
  addMouseMove: lib.addMouseMove,
  handleEvent: lib.handleEvent,
};

export default CustomCursor;
