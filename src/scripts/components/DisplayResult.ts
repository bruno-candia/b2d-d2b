import type { ConversionState } from '../services/state/ConversionState';
import { updateTitle } from '../utils/updateTitle';

export class DisplayResult {
  private element: HTMLFormElement | null;
  private resultTitle: HTMLHeadingElement | null;
  private resultInput: HTMLInputElement | null;

  private conversionState: ConversionState;

  constructor(conversionState: ConversionState) {
    this.element = document.querySelector('#result-display');
    this.resultTitle = document.querySelector('#result-display__title');
    this.resultInput = document.querySelector('#result');

    this.conversionState = conversionState;
  }

  hydrate(): void {
    if (!this.element) return;
    this.bindEvents();
    this.conversionState.subscribeToType((newType) => {
      if (!this.resultTitle) return;
      updateTitle(this.resultTitle, newType);
    });

    this.conversionState.subscribeToResult((newResult) => {
      this.updateResultValue(newResult);
    });
  }

  private bindEvents(): void {
    if (!this.element) return;
  }

  private updateResultValue(newResult: string) {
    if (!this.resultInput) return;
    console.log(newResult);
    this.resultInput.value = newResult;
  }
}
