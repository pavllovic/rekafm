import { KeysActions, getActionFromKey, getUpdatedIndex } from 'Lib/keyActions/KeysActions';

export function combobox(elem) {
  this.elem = elem;
  this.combobox = this.elem.querySelector('[role="combobox"]');
  this.options = this.elem.querySelector('[role="listbox"]');
  this.arrayOptions = Array.from(this.options.children);
  // this.input = this.elem.querySelector('input');
  this.output = this.elem.querySelector('.value');
  // state combobox
  this.open = false;
  this.optionSelectedIndex = 0;
  this.optionFocusedIndex = 0;
}

export function init() {
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
  const activeId = this.arrayOptions[this.optionSelectedIndex].getAttribute('id');
  this.combobox.setAttribute('aria-activedescendant', `${activeId}`);
  this.onOptionFocused(this.optionSelectedIndex);
}

export function closeOptions() {
  this.elem.classList.remove('open');
  this.combobox.setAttribute('aria-activedescendant', '');
}

export function resetCombobox() {
  this.combobox.setAttribute('aria-activedescendant', '');
  this.combobox.textContent = this.arrayOptions[0].textContent;
  this.arrayOptions[0].querySelector('[type="checkbox"]').setAttribute('checked', true);
  console.log(this.input);
  this.input.setAttribute('value', this.arrayOptions[0].textContent);
  this.arrayOptions[this.optionSelectedIndex].setAttribute('aria-selected', 'false');
  this.arrayOptions[this.optionFocusedIndex].classList.remove('is-focus');
  this.arrayOptions[this.optionFocusedIndex].querySelector('[type="checkbox"]').removeAttribute('checked');
  this.optionSelectedIndex = 0;
  this.optionFocusedIndex = 0;
}

export function onOptionChecked(e) {
  const role = e.target.getAttribute('role');
  const prevOption = this.arrayOptions[this.optionSelectedIndex];
  const option = (role === 'option') ? e.target : this.arrayOptions[this.optionFocusedIndex];

  if(prevOption) {
    prevOption.setAttribute('aria-selected', 'false');
    prevOption.querySelector('[type="checkbox"]').removeAttribute('checked');
  }
  if(option) {
    option.setAttribute('aria-selected', 'true');
    const value = option.querySelector('.text').textContent;
    this.output.innerText = value;
    option.querySelector('[type="checkbox"]').setAttribute('checked', true);
  }

  const index = this.arrayOptions.findIndex((item) => item === option);

  this.optionSelectedIndex = index;
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
  if(this.open) this.toogleOptions(e);
}

export function onListboxMouseDown() {
  this.ignoreBlur = true;
}

export function onOptionFocused(index) {
  const prevOption = this.arrayOptions[this.optionFocusedIndex];
  const option = this.arrayOptions[index];

  this.combobox.setAttribute('aria-activedescendant', `${option.id}`);

  if(prevOption) prevOption.classList.remove('is-focus');
  if(option) option.classList.add('is-focus');

  this.optionFocusedIndex = index;
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
      e.preventDefault();
      e.stopPropagation();
      const role = e.target.getAttribute('role');
      if(role === 'combobox') {
        return this.toogleOptions(e);
      }
      if(role === 'option') {
        this.onOptionChecked(e);
        return this.toogleOptions(e);
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
