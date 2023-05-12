// export function tabs(elem) {
//   this.tablist = elem;
//   this.activePanel = new Set();
// }

export function tabs(elemList) {
  this.tablists = elemList;
  this.activePanel = new Set();
}

// export function init() {
//   this.setListeners();
//   this.activateTab(this.tablist.querySelector('[role="tab"]'));
// }

export function init() {
  this.setListeners();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const selector = urlParams.get('tab') ? `#${urlParams.get('tab')}` : '[role="tab"]';
  this.activeTabId = 'tab-buying';
  this.tablists.forEach((item) => {
    this.activateTab(item.querySelector(`${selector}`));
  });
}

// export function setListeners() {
//   this.tablist.addEventListener('click', this);
//   this.tablist.addEventListener('keydown', this);
// }

export function setListeners() {
  this.tablists.forEach((item) => {
    item.addEventListener('click', this);
    item.addEventListener('keydown', this);
  });
}

export function getPanelsId(tab) {
  const id = tab.getAttribute('aria-controls').split(' ');
  return id;
}

export function deactivateTab(id) {
  const tabList = document.querySelectorAll(`#${id}`);
  tabList.forEach((item) => {
    item.setAttribute('tabindex', '-1');
    item.setAttribute('aria-selected', false);
    item.classList.remove('active');
  });
}

export function activateTab(tab) {
  const tabId = tab.getAttribute('id');
  const tabList = document.querySelectorAll(`#${tabId}`);
  if(this.activeTabId) this.deactivateTab(this.activeTabId);
  tabList.forEach((item) => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-selected', true);
    item.classList.add('active');
  });
  const panelsId = this.getPanelsId(tab);
  const panels = panelsId.map((id) => document.querySelector(`#${id}`));
  this.showPanel(panels);
  this.activeTabId = tabId;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  urlParams.set('tab', tabId);
  const str = urlParams.toString();
  const newUrl = `${window.location.origin}${window.location.pathname}?${str}`;
  window.history.replaceState(null, null, newUrl);
}

export function hidePanel() {
  this.activePanel.forEach((panel) => {
    panel.setAttribute('tabindex', '-1');
    panel.classList.remove('active');
    this.activePanel.delete(panel);
  });
}

export function showPanel(panels) {
  if(this.activePanel.size) this.hidePanel();
  panels.forEach((panel) => {
    panel.setAttribute('tabindex', '0');
    panel.classList.add('active');
    this.activePanel.add(panel);
    this.setHeightPanellist(panel);
  });
}

export function setHeightPanellist(panel) {
  const height = panel.offsetHeight;
  const panellist = panel.parentElement;
  panellist.style.setProperty('--height-panellist', height);
}

export function focusTab(tab) {
  tab.focus();
}

export function onkeydown(e) {
  switch(e.key) {
    case 'ArrowDown':
    case 'ArrowRight':
      e.preventDefault();
      if(e.target.nextElementSibling) {
        return this.focusTab(e.target.nextElementSibling);
      }
      break;
    case 'ArrowUp':
    case 'ArrowLeft':
      e.preventDefault();
      if(e.target.previousElementSibling) {
        return this.focusTab(e.target.previousElementSibling);
      }
      break;
    case 'Home':
      e.preventDefault();
      return this.focusTab(this.tablist.firstElementChild);
    case 'End':
      e.preventDefault();
      return this.focusTab(this.tablist.lastElementChild);
    case 'Space':
      e.preventDefault();
      return this.activateTab(e.currentTarget);
    default:
      break;
  }
  return undefined;
}

export function handleEvent(e) {
  switch(e.type) {
    case 'click':
      if(e.target.getAttribute('role') === 'tab') {
        e.target.scrollIntoView(true);
        return this.activateTab(e.target);
      }
      break;
    case 'keydown':
      e.stopPropagation();
      if(e.target.getAttribute('role') === 'tab') {
        e.target.scrollIntoView(true);
        return this.onkeydown(e);
      }
      break;
    default:
      break;
  }
  return undefined;
}
