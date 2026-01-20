import type { SettingsState } from '../services/state/SettingsState';

export class CalculationSteps {
  private displayCalculationElement: HTMLElement | null;

  private settingsState: SettingsState;

  constructor(settingsState: SettingsState) {
    this.displayCalculationElement = document.querySelector('#calculation-steps');
    this.settingsState = settingsState;
  }

  hydrate(): void {
    if (!this.displayCalculationElement) return;
    this.bindEvents();
  }

  private bindEvents(): void {
    this.settingsState.subscribeToIsDisplayCalculation((newIsDisplayCalculation) => {
      console.log(newIsDisplayCalculation);
      this.hiddenDisplayCalculation(newIsDisplayCalculation);
    });
  }

  private hiddenDisplayCalculation(newIsDisplayCalculation: boolean) {
    if (!this.displayCalculationElement) return;

    if (!newIsDisplayCalculation) {
      this.displayCalculationElement.style.display = 'none';
    } else {
      this.displayCalculationElement.style.display = 'flex';
    }
  }
}
