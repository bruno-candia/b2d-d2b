import type { ConversionState } from './state/ConversionState';
import type { SettingsState } from './state/SettingsState';
import type { CalculationStep } from '../types/CalculationStep';

export class ConversionCalculationService {
  private conversionState: ConversionState;
  private settingsState: SettingsState;
  private onStepsGenerated: ((steps: CalculationStep[], finalResult: string) => void) | null = null;

  constructor(conversionState: ConversionState, settingsState: SettingsState) {
    this.conversionState = conversionState;
    this.settingsState = settingsState;

    this.conversionState.subscribeToInput((newInput) => {
      if (!newInput) return;

      const { steps, result } = this.calculateWithSteps(newInput);

      if (this.settingsState.state.isDisplayCalculation && this.onStepsGenerated) {
        this.onStepsGenerated(steps, result);
      } else {
        this.conversionState.setResult(result);
      }
    });
  }

  setOnStepsGenerated(callback: (steps: CalculationStep[], finalResult: string) => void) {
    this.onStepsGenerated = callback;
  }

  private calculateWithSteps(value: string): { steps: CalculationStep[]; result: string } {
    const type = this.conversionState.state.type;

    if (type === 'DECIMAL_TO_BINARY') {
      return this.decimalToBinarySteps(parseInt(value, 10));
    } else {
      return this.binaryToDecimalSteps(value);
    }
  }

  private decimalToBinarySteps(decimal: number): { steps: CalculationStep[]; result: string } {
    const steps: CalculationStep[] = [];
    let current = decimal;
    let binaryResult = '';

    while (current > 0) {
      const remainder = current % 2;
      const quotient = Math.floor(current / 2);

      steps.push({
        calculation: `${current} ÷ 2 = ${quotient} remainder ${remainder}`,
        result: remainder.toString(),
      });

      binaryResult = remainder.toString() + binaryResult;
      current = quotient;
    }

    if (binaryResult === '') binaryResult = '0';

    return { steps, result: binaryResult };
  }

  private binaryToDecimalSteps(binary: string): { steps: CalculationStep[]; result: string } {
    const steps: CalculationStep[] = [];
    let decimalResult = 0;
    const digits = binary.split('').reverse();

    digits.forEach((digit, index) => {
      const power = Math.pow(2, index);
      const value = parseInt(digit, 10) * power;

      steps.push({
        calculation: `${digit} × 2^${index} = ${digit} × ${power}`,
        result: value.toString(),
      });

      decimalResult += value;
    });

    steps.reverse();

    return { steps, result: decimalResult.toString() };
  }
}
