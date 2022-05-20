import * as lib from 'Lib/combobox/combobox.js';

const Combobox = lib.combobox;

Combobox.prototype = {
  constructor: Combobox,
  init: lib.init,
  toogleOptions: lib.toogleOptions,
  openOptions: lib.openOptions,
  closeOptions: lib.closeOptions,
  resetCombobox: lib.resetCombobox,
  onOptionChecked: lib.onOptionChecked,
  onKeydown: lib.onKeydown,
  onComboboxBlur: lib.onComboboxBlur,
  onListboxMouseDown: lib.onListboxMouseDown,
  onOptionFocused: lib.onOptionFocused,
  destroy: lib.destroy,
  handleEvent: lib.handleEvent,
};

export default Combobox;
