import type { ConversionTypeState } from '../services/state/ConversionState';
import { CONVERSION_TYPE } from '../types/ConversionType';

export class DisplayResult {
  private element: HTMLFormElement | null;
  private resultTitle: HTMLHeadingElement | null;

  private conversionStateService: ConversionTypeState;

  constructor(conversionStateService: ConversionTypeState) {
    this.element = document.querySelector('#result-display');
    this.resultTitle = document.querySelector('#result-display__title');
    this.conversionStateService = conversionStateService;
  }

  hydrate(): void {
    if (!this.element) return;
    this.bindEvents();
    this.conversionStateService.subscribe((newState) => {
      this.handleCalculationTitle(newState.type);
    });
  }

  private bindEvents(): void {
    if (!this.element) return;
  }

  private handleCalculationTitle(newState: CONVERSION_TYPE) {
    if (!this.resultTitle) return;

    const FORM_TITLES = {
      [CONVERSION_TYPE.DECIMAL_TO_BINARY]: 'BINARY RESULT',
      [CONVERSION_TYPE.BINARY_TO_DECIMAL]: 'DECIMAL RESULT',
    };

    this.resultTitle.innerText = FORM_TITLES[newState];
  }
}
