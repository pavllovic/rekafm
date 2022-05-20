export function tabs(elem) {
  this.tablist = elem;
  this.activePanel = new Set();
}

export function init() {
  this.setListeners();
  this.activateTab(this.tablist.querySelector('[role="tab"]'));
}

export function setListeners() {
  this.tablist.addEventListener('click', this);
  this.tablist.addEventListener('keydown', this);
}

export function getPanelsId(tab) {
  const id = tab.getAttribute('aria-controls').split(' ');
  return id;
}

export function deactivateTab(tab) {
  tab.setAttribute('tabindex', '-1');
  tab.setAttribute('aria-selected', false);
  tab.classList.remove('active');
}

export function activateTab(tab) {
  if(this.activeTab) this.deactivateTab(this.activeTab);
  tab.setAttribute('tabindex', '0');
  tab.setAttribute('aria-selected', true);
  tab.classList.add('active');
  const panelsId = this.getPanelsId(tab);
  const panels = panelsId.map((id) => document.querySelector(`#${id}`));
  this.showPanel(panels);
  this.activeTab = tab;
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
      if(e.target.getAttribute('role') === 'tab') return this.activateTab(e.target);
      break;
    case 'keydown':
      e.stopPropagation();
      if(e.target.getAttribute('role') === 'tab') return this.onkeydown(e);
      break;
    default:
      break;
  }
  return undefined;
}
