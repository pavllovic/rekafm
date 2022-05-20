import * as lib from 'Lib/multiCombobox/multiCombobox.js';

const MultiCombobox = lib.multiCombobox;

MultiCombobox.prototype = {
  constructor: MultiCombobox,
  init: lib.init,
  toogleOptions: lib.toogleOptions,
  openOptions: lib.openOptions,
  closeOptions: lib.closeOptions,
  resetCombobox: lib.resetCombobox,
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
