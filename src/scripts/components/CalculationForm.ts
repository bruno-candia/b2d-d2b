import type { ConversionTypeState } from '../services/state/ConversionState';
import { CONVERSION_TYPE } from '../types/ConversionType';

export class CalculationForm {
  private element: HTMLFormElement | null;
  private formTitle: HTMLHeadingElement | null;

  private conversionStateService: ConversionTypeState;

  constructor(conversionStateService: ConversionTypeState) {
    this.element = document.querySelector('#converter-form');
    this.formTitle = document.querySelector('#converter-form__title');
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
    this.element.addEventListener('submit', (event) => this.handleSubmit(event));
  }

  private handleSubmit(event: Event) {
    event.preventDefault();
    const formData = new FormData(this.element!);
    const fieldValue = Number(formData.get('value'));

    if (!fieldValue) return;

    console.log(fieldValue);
  }

  private handleCalculationTitle(newState: CONVERSION_TYPE) {
    if (!this.formTitle) return;

    const FORM_TITLES = {
      [CONVERSION_TYPE.DECIMAL_TO_BINARY]: 'DECIMAL INPUT',
      [CONVERSION_TYPE.BINARY_TO_DECIMAL]: 'BINARY INPUT',
    };

    this.formTitle.innerText = FORM_TITLES[newState];
  }
}
