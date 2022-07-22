import * as lib from 'Lib/multiCombobox/multiCombobox.js';

const MultiCombobox = lib.multiCombobox;

MultiCombobox.prototype = {
  constructor: MultiCombobox,
  init: lib.init,
  setListeners: lib.setListeners,
  updateMapSelected: lib.updateMapSelected,
  toogleOptions: lib.toogleOptions,
  openOptions: lib.openOptions,
  closeOptions: lib.closeOptions,
  reset: lib.reset,
  onOptionChecked: lib.onOptionChecked,
  selectOption: lib.selectOption,
  unselectOption: lib.unselectOption,
  onKeydown: lib.onKeydown,
  onComboboxBlur: lib.onComboboxBlur,
  onListboxMouseDown: lib.onListboxMouseDown,
  onOptionFocused: lib.onOptionFocused,
  updateOutput: lib.updateOutput,
  updateValue: lib.updateValue,
  destroy: lib.destroy,
  handleEvent: lib.handleEvent,
};

export default MultiCombobox;
