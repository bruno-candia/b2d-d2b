import type { ConversionState } from '../services/state/ConversionState';
import type { SettingsState } from '../services/state/SettingsState';
import type { CalculationStep } from '../types/CalculationStep';

export class CalculationSteps {
  private displayCalculationElement: HTMLElement | null;
  private calculationTextarea: HTMLTextAreaElement | null;
  private resultTextarea: HTMLTextAreaElement | null;

  private settingsState: SettingsState;
  private conversionState: ConversionState;

  private animationSpeed = 300;
  private animationTimeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(settingsState: SettingsState, conversionState: ConversionState) {
    this.displayCalculationElement = document.querySelector('#calculation-steps');
    this.calculationTextarea = document.querySelector('#calculation-steps__calculation-step');
    this.resultTextarea = document.querySelector('#calculation-steps__result-step');

    this.settingsState = settingsState;
    this.conversionState = conversionState;
  }

  hydrate(): void {
    if (!this.displayCalculationElement) return;
    this.bindEvents();
  }

  private bindEvents(): void {
    this.settingsState.subscribeToIsDisplayCalculation((newIsDisplayCalculation) => {
      this.toggleDisplayCalculation(newIsDisplayCalculation);
    });

    this.conversionState.subscribeToType(() => {
      this.cancelAnimation();
      this.clearDisplay();
    });
  }

  private cancelAnimation(): void {
    if (this.animationTimeoutId) {
      clearTimeout(this.animationTimeoutId);
      this.animationTimeoutId = null;
    }
  }

  private toggleDisplayCalculation(isVisible: boolean) {
    if (!this.displayCalculationElement) return;

    if (!isVisible) {
      this.displayCalculationElement.style.display = 'none';
    } else {
      this.displayCalculationElement.style.display = 'flex';
    }
  }

  displayStepsAnimated(steps: CalculationStep[], finalResult: string): void {
    this.cancelAnimation();

    if (!this.calculationTextarea || !this.resultTextarea) {
      this.conversionState.setResult(finalResult);
      return;
    }

    this.calculationTextarea.value = '';
    this.resultTextarea.value = '';

    let currentStep = 0;

    const animateNextStep = () => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];

        this.calculationTextarea!.value += step.calculation + '\n';

        this.resultTextarea!.value += step.result + '\n';

        this.calculationTextarea!.scrollTop = this.calculationTextarea!.scrollHeight;
        this.resultTextarea!.scrollTop = this.resultTextarea!.scrollHeight;

        currentStep++;
        this.animationTimeoutId = setTimeout(animateNextStep, this.animationSpeed);
      } else {
        this.animationTimeoutId = null;
        this.conversionState.setResult(finalResult);
      }
    };

    animateNextStep();
  }

  clearDisplay(): void {
    if (this.calculationTextarea) this.calculationTextarea.value = '';
    if (this.resultTextarea) this.resultTextarea.value = '';
  }
}
