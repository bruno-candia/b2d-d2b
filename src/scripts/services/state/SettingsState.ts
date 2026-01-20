import type { SettingsStateType } from '@/scripts/types/SettingsType';

export class SettingsState {
  private _state: SettingsStateType = {
    isDisplayCalculation: true,
  };
  private _isDisplayCalculationListener: ((status: boolean) => void)[] = [];

  constructor() {
    this._isDisplayCalculationListener = [];
  }

  get state() {
    return this._state;
  }

  setIsDisplayCalculation(newStatus: boolean) {
    if (newStatus != this._state.isDisplayCalculation) {
      this._state.isDisplayCalculation = newStatus;
      this.notifyIsDisplayCalculation();
    }
  }

  subscribeToIsDisplayCalculation(callback: (status: boolean) => void) {
    this._isDisplayCalculationListener.push(callback);
  }

  private notifyIsDisplayCalculation() {
    this._isDisplayCalculationListener.forEach((fn) => fn(this._state.isDisplayCalculation));
  }
}
