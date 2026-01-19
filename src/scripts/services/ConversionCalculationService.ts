import type { ConversionState } from './state/ConversionState';

export class ConversionCalculationService {
  private conversionState: ConversionState;

  constructor(conversionState: ConversionState) {
    this.conversionState = conversionState;

    this.conversionState.subscribeToInput((newInput) => {
      const result = this.calculate(newInput);
      this.conversionState.setResult(result);
    });
  }

  private calculate(value: string): string {
    const type = this.conversionState.state.type;
    if (type === 'DECIMAL_TO_BINARY') {
      return parseInt(value, 10).toString(2);
    } else {
      return parseInt(value, 2).toString(10);
    }
  }
}
