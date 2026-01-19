import { CONVERSION_TYPE } from '../types/ConversionType';

type Listener = (newValue: CONVERSION_TYPE) => void;

export class ConversionTypeState {
  private _currentState: CONVERSION_TYPE;
  private _arrayOfListeners: Listener[];

  constructor() {
    this._arrayOfListeners = [];
    this._currentState = CONVERSION_TYPE.DECIMAL_TO_BINARY;
  }

  get state() {
    return this._currentState;
  }

  subscribe(callback: Listener) {
    this._arrayOfListeners.push(callback);
  }

  setNewMode(newMode: CONVERSION_TYPE) {
    if (newMode && newMode != this._currentState) {
      this._currentState = newMode;
      this.notifyAll();
    }
  }

  private notifyAll() {
    this._arrayOfListeners.forEach((fn) => fn(this._currentState));
  }
}
