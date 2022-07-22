import { KeysActions, getActionFromKey, getUpdatedIndex } from 'Lib/keyActions/KeysActions';

export function multiCombobox(elem) {
  this.elem = elem;
  this.combobox = this.elem.querySelector('[role="combobox"]');
  this.options = this.elem.querySelector('[role="listbox"]');
  this.arrayOptions = Array.from(this.options.children);
  // this.input = this.elem.querySelector('input');
  this.output = this.elem.querySelector('.value');
  this.mapSelected = new Map();
  // state combobox
  this.open = false;
  // this.optionSelectedIndex = 0;
  this.optionFocusedIndex = 0;
}

export function init() {
  this.setListeners();
  this.updateMapSelected();
}

export function setListeners() {
  this.combobox.addEventListener('blur', this);
  this.combobox.addEventListener('click', this);
  this.combobox.addEventListener('keydown', this);
  this.options.addEventListener('mousedown', this);
  this.options.addEventListener('click', this);
}

export function toogleOptions(e) {
  e.stopPropagation();
  if(this.arrayOptions.length < 1) return;
  this.open = !this.open;
  this.combobox.setAttribute('aria-expanded', `${this.open}`);
  this.open ? this.openOptions() : this.closeOptions();
}

export function openOptions() {
  this.elem.classList.add('open');
  const activeId = [];
  this.mapSelected.forEach((value, key) => {
    activeId.push(key.getAttribute('id'));
  });
  this.combobox.setAttribute('aria-activedescendant', activeId.join(' '));
  this.onOptionFocused(0);
}

export function closeOptions() {
  this.elem.classList.remove('open');
  this.combobox.setAttribute('aria-activedescendant', '');
}

export function reset() {
  this.combobox.setAttribute('aria-activedescendant', '');
  this.output.textContent = this.arrayOptions[0].textContent;
  this.mapSelected.forEach((value, key) => {
    key.setAttribute('aria-selected', 'false');
    key.classList.remove('selected');
    value.checkbox.checked = false; // eslint-disable-line
  });
  this.mapSelected.clear();
  this.combobox.removeAttribute('data-value');
}

export function onOptionChecked(option) {
  this.mapSelected.has(option) ? this.unselectOption(option) : this.selectOption(option);
  this.updateOutput();
}

export function selectOption(option) {
  option.setAttribute('aria-selected', 'true');
  option.classList.add('selected');
  const value = option.querySelector('.text').textContent;
  const checkbox = option.querySelector('[type="checkbox"]');
  // checkbox.setAttribute('checked', true);
  this.mapSelected.set(option, { value: value, checkbox: checkbox });
}

export function unselectOption(option) {
  option.setAttribute('aria-selected', 'false');
  option.classList.remove('selected');
  // this.mapSelected.get(option).checkbox.removeAttribute('checked');
  this.mapSelected.delete(option);
}

export function updateMapSelected() {
  this.arrayOptions.forEach((option) => {
    if(option.classList.contains('selected')) {
      const value = option.querySelector('.text').textContent;
      const checkbox = option.querySelector('[type="checkbox"]');
      this.mapSelected.set(option, { value: value, checkbox: checkbox });
    }
  });
}

export function updateOutput() {
  if(this.mapSelected.size === 0) return this.reset();
  let output = '';
  if(this.mapSelected.size === 1) {
    output = Array.from(this.mapSelected)[0][1].value;
  }
  if(this.mapSelected.size > 1) {
    output = `${Array.from(this.mapSelected)[0][1].value},..(${this.mapSelected.size})`;
  }
  this.output.innerText = output;
  return this.updateValue();
}

export function updateValue() {
  const values = [];
  this.mapSelected.forEach((value) => {
    values.push(value.value);
  });
  this.combobox.setAttribute('data-value', values);
}

export function onKeydown(e) {
  const max = this.arrayOptions.length - 1;
  const action = getActionFromKey(e, this.open);

  switch(action) {
    case KeysActions.Next:
    case KeysActions.Last:
    case KeysActions.First:
    case KeysActions.Previous:
      e.preventDefault();
      return this.onOptionFocused(getUpdatedIndex(this.optionFocusedIndex, max, action));
    case KeysActions.Space:
      e.preventDefault();
      return this.toogleOptions(e);
    case KeysActions.CloseSelect:
      e.preventDefault();
      this.onOptionChecked(e);
      return this.toogleOptions(e);
    case KeysActions.Close:
      e.preventDefault();
      return this.toogleOptions(e);
    case KeysActions.Open:
      e.preventDefault();
      return this.toogleOptions(e);
    case KeysActions.Blur:
      return this.closeOptions();
    default:
      break;
  }
  return undefined;
}

export function onComboboxBlur(e) {
  if(this.ignoreBlur) {
    this.ignoreBlur = false;
    this.combobox.focus();
    return;
  }
  if(this.open) {
    this.toogleOptions(e);
  }
}

export function onListboxMouseDown() {
  this.ignoreBlur = true;
}

export function onOptionFocused(index) {
  const option = this.arrayOptions[index];
  if(option) option.classList.add('is-focus');
}

export function destroy() {
  this.combobox.removeEventListener('blur', this);
  this.combobox.removeEventListener('click', this);
  this.combobox.removeEventListener('keydown', this);
  this.options.removeEventListener('mousedown', this);
  this.arrayOptions[this.optionFocusedIndex].classList.remove('is-focus');
}

export function handleEvent(e) {
  switch(e.type) {
    case 'click':
      e.stopPropagation();
      const role = e.target.getAttribute('role');
      if(role === 'combobox') {
        return this.toogleOptions(e);
      }
      if((role === 'option') && (e.target.getAttribute('data-combobox') === 'reset')) {
        return this.reset();
      }
      if(role === 'option') {
        this.ignoreBlur = true;
        return this.onOptionChecked(e.target);
      }
      // if(role === 'listbox') {
      //   return this.combobox.focus();
      // }
      break;
    case 'blur':
      return this.onComboboxBlur(e);
    case 'keydown':
      return this.onKeydown(e);
    case 'mousedown':
      return this.onListboxMouseDown();
    default:
      break;
  }
  return undefined;
}
