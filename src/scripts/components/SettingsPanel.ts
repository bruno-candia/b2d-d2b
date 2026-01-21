import type { SettingsState } from '../services/state/SettingsState';

export class SettingsPanel {
  private panelElement: HTMLElement | null;
  private settingsElement: HTMLFormElement | null;
  private buttonEnabled: HTMLButtonElement | null;
  private buttonDisabled: HTMLButtonElement | null;
  private triggerButton: HTMLButtonElement | null;
  private closeButton: HTMLButtonElement | null;
  private overlay: HTMLElement | null;

  private settingsState: SettingsState;

  constructor(settingsState: SettingsState) {
    this.panelElement = document.querySelector('#settings-panel');
    this.settingsElement = document.querySelector('.settings-panel__menu');
    this.buttonEnabled = document.querySelector('[data-display="enabled"]');
    this.buttonDisabled = document.querySelector('[data-display="disabled"]');
    this.triggerButton = document.querySelector('#settings-trigger');
    this.closeButton = document.querySelector('#settings-close');
    this.overlay = document.querySelector('.settings-modal__overlay');

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

    this.triggerButton?.addEventListener('click', () => this.openModal());
    this.closeButton?.addEventListener('click', () => this.closeModal());
    this.overlay?.addEventListener('click', () => this.closeModal());
  }

  private openModal(): void {
    this.panelElement?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  private closeModal(): void {
    this.panelElement?.classList.remove('is-open');
    document.body.style.overflow = '';
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
