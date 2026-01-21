import type { ConversionState } from '../services/state/ConversionState';
import { updateTitle } from '../utils/updateTitle';

export class ConverterOutput {
  private resultElement: HTMLFormElement | null;
  private resultTitle: HTMLHeadingElement | null;
  private resultInput: HTMLInputElement | null;

  private conversionState: ConversionState;

  constructor(conversionState: ConversionState) {
    this.resultElement = document.querySelector('#converter-output');
    this.resultTitle = document.querySelector('#converter-output__title');
    this.resultInput = document.querySelector('#result');

    this.conversionState = conversionState;
  }

  hydrate(): void {
    if (!this.resultElement) return;
    this.bindEvents();
    this.conversionState.subscribeToType((newType) => {
      if (this.resultTitle) {
        updateTitle(this.resultTitle, newType);
      }
      this.clearResult();
    });

    this.conversionState.subscribeToResult((newResult) => {
      this.updateResultValue(newResult);
    });
  }

  private clearResult(): void {
    if (this.resultInput) {
      this.resultInput.value = '';
    }
  }

  private bindEvents(): void {
    if (!this.resultElement) return;
  }

  private updateResultValue(newResult: string) {
    if (!this.resultInput) return;
    this.resultInput.value = newResult;
  }
}
