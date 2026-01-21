import type { ConversionState } from '../services/state/ConversionState';
import { CONVERSION_TYPE } from '../types/ConversionType';
import { updateTitle } from '../utils/updateTitle';

export class ConverterInput {
  private formElement: HTMLFormElement | null;
  private formTitle: HTMLHeadingElement | null;
  private valueInput: HTMLInputElement | null;

  private conversionState: ConversionState;

  constructor(conversionState: ConversionState) {
    this.formElement = document.querySelector('#converter-form');
    this.formTitle = document.querySelector('#converter-form__title');
    this.valueInput = document.querySelector('#value');
    this.conversionState = conversionState;
  }

  hydrate(): void {
    if (!this.formElement) return;
    this.bindEvents();
    this.conversionState.subscribeToType((newType) => {
      if (this.formTitle) {
        updateTitle(this.formTitle, newType);
      }
      this.clearInput();
    });

    this.conversionState.subscribeToInput((newInput) => {
      this.updateInputValue(newInput);
    });
  }

  private clearInput(): void {
    if (this.valueInput) {
      this.valueInput.value = '';
    }
  }

  private bindEvents(): void {
    if (!this.formElement) return;
    this.formElement.addEventListener('submit', (event) => this.handleSubmit(event));

    if (!this.valueInput) return;
    this.valueInput.addEventListener('input', (event) => this.handleValueInput(event));
  }

  private handleValueInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const currentType = this.conversionState.state.type;
    const currentValueTyped = inputElement.value;

    if (currentType === CONVERSION_TYPE.BINARY_TO_DECIMAL) {
      const cleanValue = currentValueTyped.replace(/[^01]/g, '');

      if (currentValueTyped != cleanValue) {
        inputElement.value = cleanValue;
      }
    }

    if (currentType === CONVERSION_TYPE.DECIMAL_TO_BINARY) {
      const cleanValue = currentValueTyped.replace(/[^0-9]/g, '');

      if (currentValueTyped != cleanValue) {
        inputElement.value = cleanValue;
      }
    }
  }

  private handleSubmit(event: Event) {
    event.preventDefault();
    const formData = new FormData(this.formElement!);
    const fieldValue = String(formData.get('value'));

    if (!fieldValue) return;

    this.conversionState.setInput(fieldValue);
  }

  private updateInputValue(newInput: string): void {
    if (!this.valueInput) return;
    this.valueInput.value = newInput;
  }
}
