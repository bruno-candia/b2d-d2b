import { Header } from '@components/Header';
import { CalculationForm } from '@/scripts/components/CalculationForm';
import { ConversionTypeState } from '../services/ConversionTypeState';
import { DisplayResult } from '../components/DisplayResult';

export class App {
  private header: Header;
  private calculationForm: CalculationForm;
  private displayResult: DisplayResult;

  private conversionState: ConversionTypeState;

  constructor() {
    this.conversionState = new ConversionTypeState();
    this.header = new Header(this.conversionState);
    this.displayResult = new DisplayResult(this.conversionState);

    this.calculationForm = new CalculationForm(this.conversionState);
  }

  hydrate(): void {
    this.header.hydrate();
    this.calculationForm.hydrate();
    this.displayResult.hydrate();
  }
}
