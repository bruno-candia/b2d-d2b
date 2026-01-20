import { CONVERSION_TYPE, type ConversionStateType } from '../../types/ConversionType';

export class ConversionState {
  private _state: ConversionStateType = {
    type: CONVERSION_TYPE.DECIMAL_TO_BINARY,
    input: '',
    result: '',
    history: [],
  };
  private _typeListener: ((type: CONVERSION_TYPE) => void)[] = [];
  private _inputListener: ((input: string) => void)[] = [];
  private _resultListener: ((type: string) => void)[] = [];

  constructor() {
    this._typeListener = [];
    this._inputListener = [];
    this._resultListener = [];
  }

  get state() {
    return this._state;
  }

  setType(newType: CONVERSION_TYPE) {
    if (newType && newType != this._state.type) {
      this._state.type = newType;
      this.notifyType();
    }
  }

  setInput(value: string) {
    if (Number(value) > 0) {
      this._state.input = value;
      this.notifyInput();
    }
  }

  setResult(result: string) {
    if (Number(result) > 0) {
      this._state.result = result;
      this.notifyResult();
    }
  }

  subscribeToType(callback: (type: CONVERSION_TYPE) => void) {
    this._typeListener.push(callback);
  }

  subscribeToInput(callback: (input: string) => void) {
    this._inputListener.push(callback);
  }
  subscribeToResult(callback: (result: string) => void) {
    this._resultListener.push(callback);
  }

  private notifyType() {
    this._typeListener.forEach((fn) => fn(this._state.type));
  }

  private notifyInput() {
    this._inputListener.forEach((fn) => fn(this._state.input));
  }

  private notifyResult() {
    this._resultListener.forEach((fn) => fn(this._state.result));
  }
}
