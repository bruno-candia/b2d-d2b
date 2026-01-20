import type { SettingsState } from '../services/state/SettingsState';

export class SettingsPanel {
  private settingsElement: HTMLFormElement | null;
  private buttonEnabled: HTMLButtonElement | null;
  private buttonDisabled: HTMLButtonElement | null;

  private settingsState: SettingsState;

  constructor(settingsState: SettingsState) {
    this.settingsElement = document.querySelector('.settings-panel__menu');
    this.buttonEnabled = document.querySelector('[data-display="enabled"]');
    this.buttonDisabled = document.querySelector('[data-display="disabled"]');

    this.settingsState = settingsState;
  }

  hydrate(): void {
    if (!this.settingsElement) return;
    this.bindEvents();
  }

  private bindEvents(): void {
    if (!this.settingsElement) return;
    this.buttonEnabled?.addEventListener('click', (event) => this.handleButtonClick(event));
    this.buttonDisabled?.addEventListener('click', (event) => this.handleButtonClick(event));
  }

  private handleButtonClick(event: Event) {
    const button = event.target as HTMLElement;
    const status = button.getAttribute('data-display');

    if (!this.buttonDisabled || !this.buttonEnabled) return;

    if (status === 'enabled') {
      this.buttonDisabled.classList.remove('is-selected');
      this.buttonEnabled.classList.add('is-selected');
      this.settingsState.setIsDisplayCalculation(true);
    } else {
      this.buttonEnabled.classList.remove('is-selected');
      this.buttonDisabled.classList.add('is-selected');
      this.settingsState.setIsDisplayCalculation(false);
    }
  }
}
