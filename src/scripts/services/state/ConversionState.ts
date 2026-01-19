import { CONVERSION_TYPE, type State } from '../../types/ConversionType';

type Listener = (state: State) => void;

export class ConversionTypeState {
  private _state: State = {
    type: CONVERSION_TYPE.DECIMAL_TO_BINARY,
    input: '',
    result: '',
    history: [],
  };
  private _arrayOfListeners: Listener[];

  constructor() {
    this._arrayOfListeners = [];
  }

  get state() {
    return this._state;
  }

  setType(newMode: CONVERSION_TYPE) {
    if (newMode && newMode != this._state.type) {
      this._state.type = newMode;
      this.notifyAll();
    }
  }

  subscribe(callback: Listener) {
    this._arrayOfListeners.push(callback);
  }

  private notifyAll() {
    this._arrayOfListeners.forEach((fn) => fn(this._state));
  }
}
